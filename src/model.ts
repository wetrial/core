import extendModel from 'dva-model-extend';
import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';

interface IModel<TState> {
  namespace: string;
  state: TState;
  effects: {
    [key: string]: Effect;
  };
  reducers?: {
    [key: string]: Reducer<TState>;
  };
  subscriptions?: {
    [key: string]: Subscription;
  };
}

const baseModel = {
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

/**
 * 扩展基础model
 * @param model 页面model
 */
export default function extend<TState>(model: IModel<TState>): IModel<TState> {
  return extendModel(baseModel, model);
}
