import { produce } from 'immer';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import Settings from '../defaultSetting.js';

// 创建状态管理
const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        userInfo: {
          name: Settings.name,
          loginState: false,
        },
        //更新整个对象
        updateUserInfo: (userInfo) => set({ userInfo }), //合并userInfo
        //更新对象中某个属性
        updateLoginState: (isLogin) =>
          set(
            produce((state) => {
              state.userInfo.loginState = isLogin;
            }),
          ),
      }),
      {
        name: 'my-storage',
        getStorage: () => localStorage,
      },
      { name: 'my-app-store' }, // DevTools 中显示的 store 名称
    ),
  ),
);

export default useUserStore;
