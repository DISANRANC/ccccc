// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {}
// });
import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';

Vue.use(Vuex)
const moduleA = {
    state: {
        manager: Cookies.get('manager'),
        role: Cookies.get('role')
    },
    mutations: {
        loginIn (state, data) {
            console.log(data)
            Cookies.set('manager', data.manager, { expires: 3 });
            Cookies.set('role', data.role, { expires: 3 });
            state.manager = Cookies.get('manager');
            state.role = Cookies.get('role');
        }
    }
}
export default new Vuex.Store({
    modules: {
        ma: moduleA
    },
    state: {
        isCollapse: false,
        count: 0,
        firstName: '艾克',
        secondName: '蒙多',
        thirdName: '猴子',
        fruits: ['香蕉', '苹果', '西瓜']
    },
    // mutations 用于修改state里的数据 
    mutations: {
        add(state, pear) {
            console.log(state)
            state.count++;
            state.isCollapse = !state.isCollapse;
            state.thirdName = state.isCollapse ? "悟空" : "猴子";
            state.fruits.push(pear);
            // state = { ...state, newProp: '添加一个新值' };  这个玩意儿不管用了，用下面的replaceState()方法
            // this.replaceState({ ...state, newProp: '添加一个新值！' }); // replaceState()方法是Vuex原型上的方法，替换state
            Vue.set(state, 'newProp', '添加一个新值！'); // 这是一种写法
        },
        reduce(state) {
            state.count--
        },
        changeSecondName(state, sn) {
            // state.secondName = sn.sn;
            state.isCollapse = !state.isCollapse;
            state.secondName = state.isCollapse ? '祖安' + sn.ns : '蒙多';
        },
        changeFirstName(state) {
            state.firstName = state.firstName + state.secondName + state.thirdName;
        }
    },
    actions: {
        changeSecondName(context, s) {
            setTimeout(() => {
                context.commit('changeSecondName', s);
            }, 500)
        },
        changeFirstName({
            commit
        }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('changeFirstName')
                    resolve()
                }, 2000)
            })
        }
    }
})