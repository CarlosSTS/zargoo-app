import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogout, useMe, useRevalidate, useUpdateUser } from "~/store";

interface SetUserDataPayload {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, "expireIn">;
}

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  setUserData: (payload: SetUserDataPayload) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

const STORAGE_KEY_USER = "@zargoo:user";
const STORAGE_KEY_TOKEN = "@zargoo:token";
const STORAGE_KEY_REFRESH_TOKEN = "@zargoo:refresh-token";
const TOKEN_EXPIRATION_TIME = 15 * 60 * 1000; // 15 minutos em milissegundos

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { mutateAsync: me } = useMe();
  const { mutateAsync: revalidate } = useRevalidate();
  const { mutateAsync: logout } = useLogout();
  const { mutateAsync: updateUserMutation } = useUpdateUser();

  const revalidateToken = useCallback(
    async (hasSetUser: boolean = false): Promise<void> => {
      try {
        const refreshToken = await AsyncStorage.getItem(
          STORAGE_KEY_REFRESH_TOKEN,
        );
        if (refreshToken) {
          const response = await revalidate({
            payload: {
              refreshToken,
            },
          });
          const expireIn = Date.now() + TOKEN_EXPIRATION_TIME;
          const { accessToken } = response.data;
          await AsyncStorage.setItem(STORAGE_KEY_TOKEN, accessToken);
          if (hasSetUser) {
            const userDataMe = await me();
            const userData = {
              ...userDataMe.data,
              expireIn,
            };
            await AsyncStorage.setItem(
              STORAGE_KEY_USER,
              JSON.stringify(userData),
            );
            setUser(userData);
          }
        }
      } catch (error) {
        // await AsyncStorage.multiRemove([
        //   STORAGE_KEY_USER,
        //   STORAGE_KEY_TOKEN,
        //   STORAGE_KEY_REFRESH_TOKEN,
        // ]);
        // setUser(null);
      }
    },
    [revalidate, me],
  );

  // TODO: Valida o token armazenado e carrega os dados do usuário
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        await revalidateToken(true);
      } catch (error) {
        // ignore
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, [revalidateToken]);

  // TODO: Configura o intervalo de revalidação do token
  useEffect(() => {
    const interval = setInterval(() => {
      if (!user?.expireIn || user?.expireIn > Date.now()) {
        return;
      }
      revalidateToken();
    }, TOKEN_EXPIRATION_TIME);
    return () => clearInterval(interval);
  }, [user?.expireIn, revalidateToken]);

  const setUserData = useCallback(
    async (payload: SetUserDataPayload): Promise<void> => {
      const expireIn = Date.now() + TOKEN_EXPIRATION_TIME;
      const { accessToken, refreshToken, user } = payload;
      // TODO: Faço isso aqui para adicionar o expireIn no user
      // para evitar fazer outra requisição ao backend logo após o login
      const userData = {
        ...user,
        expireIn,
      };
      await AsyncStorage.multiSet([
        [STORAGE_KEY_TOKEN, accessToken],
        [STORAGE_KEY_REFRESH_TOKEN, refreshToken],
        [STORAGE_KEY_USER, JSON.stringify(userData)],
      ]);
      setUser(userData);
    },
    [],
  );

  const signOut = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    await logout();
    await AsyncStorage.multiRemove([
      STORAGE_KEY_USER,
      STORAGE_KEY_TOKEN,
      STORAGE_KEY_REFRESH_TOKEN,
    ]);
    setUser(null);
    setIsLoading(false);
  }, [logout]);

  const updateUser = useCallback(
    async (userData: Partial<User>): Promise<void> => {
      if (!user?.id) return;

      const response = await updateUserMutation({
        payload: {
          userId: user.id,
          userData,
        },
      });

      const updatedUser = {
        ...response.data,
        expireIn: user.expireIn,
      };

      setUser(updatedUser);
      await AsyncStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updatedUser));
    },
    [user?.id, user?.expireIn, updateUserMutation],
  );

  const value: AuthContextData = {
    user,
    isLoading,
    setUserData,
    signOut,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
