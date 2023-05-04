// import React, { useEffect, useRef } from 'react';
// import { requireNativeComponent, View, UIManager, findNodeHandle } from 'react-native';

// const NativeBuffView = requireNativeComponent('BuffView');

// const BuffView = ({ onInitialized }) => {
//   const nativeRef = useRef(null);

//   useEffect(() => {
//     UIManager.dispatchViewManagerCommand(
//       findNodeHandle(nativeRef.current),
//       UIManager.getViewManagerConfig('BuffView').Commands.initialize,
//       [],
//     );
//   }, []);

//   return (
//     <View>
//       <NativeBuffView
//         ref={nativeRef}
//         style={{ flex: 1 }}
//         onInitialized={() => onInitialized && onInitialized(nativeRef)}
//       />
//     </View>
//   );
// };

// export default BuffView;





