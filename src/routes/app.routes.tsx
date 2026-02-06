// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useCacheAuth } from '~/hooks/useCacheAuth';
// import StudentRoutes from './student.routes';
// import ResponsibleRoutes from './responsible.routes';
// import NotFound from '~/pages/NotFound';

// const Stack = createNativeStackNavigator<AppStackParamsList>();

// const AppRoutes: React.FC = () => {
//   const { user } = useCacheAuth();
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {user?.studentId && (
//         <Stack.Screen name="StudentStack" component={StudentRoutes} />
//       )}

//       {user?.responsibleId && (
//         <Stack.Screen name="ResponsibleStack" component={ResponsibleRoutes} />
//       )}
//       <Stack.Screen name="NotFound" component={NotFound} />
//     </Stack.Navigator>
//   );
// };

// export default AppRoutes;
