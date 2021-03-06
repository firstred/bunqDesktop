export const defaultState = {
    loading: false
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "BUNQ_ME_TAB_IS_LOADING":
            return {
                ...state,
                loading: true
            };

        case "BUNQ_ME_TAB_IS_NOT_LOADING":
            return {
                ...state,
                loading: false
            };
    }
    return state;
}
