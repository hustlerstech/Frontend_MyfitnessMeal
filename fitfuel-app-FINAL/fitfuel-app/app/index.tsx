/**
 * App Index
 *
 * Renders a blank dark holding screen while _layout.tsx (RootNavigator)
 * routes the user to /(auth)/welcome (unauthenticated) or their role
 * dashboard (authenticated). No <Redirect> here — that caused a stray
 * GO_BACK action because router.replace() was dispatched before the
 * navigation stack was fully initialised.
 */

import { View } from 'react-native';

export default function Index() {
  // _layout.tsx's RootNavigator effect handles all routing.
  // Return a dark view that matches the welcome screen hero so the
  // one-frame flash is invisible to the user.
  return <View style={{ flex: 1, backgroundColor: '#0a1a0d' }} />;
}
