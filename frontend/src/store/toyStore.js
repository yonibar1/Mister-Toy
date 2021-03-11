import { toyService } from '../services/toy.service'
export const toyStore = {
    state: {
        toys: null,
        toyToEdit: null,
        filterBy: {
            name: '',
            inStock: null,
            price: 0,
            sortBy: 'name'
        }
    },
    getters: {
        toys(state) {
            if (!state.toys) return   // ERROR AT FIRST SECOND...
            let toysCopy = JSON.parse(JSON.stringify(state.toys))
            if (state.filterBy.name) {
                toysCopy = toysCopy.filter(t => {
                    return t.name.toLowerCase().includes(state.filterBy.name.toLowerCase())
                })
            }
            if (state.filterBy.price) {
                toysCopy = toysCopy.filter(t => {
                    return t.price < state.filterBy.price
                })
            }
            if (state.filterBy.inStock) {
                toysCopy = toysCopy.filter(t => {
                    return t.inStock === true
                })
            }
            if (state.filterBy.sortBy === 'name') {
                toysCopy.sort((a, b) => {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                })
            }
            if (state.filterBy.sortBy === 'price') {
                toysCopy.sort((a, b) => {
                    return a.price - b.price
                })
            }
            return toysCopy
        },

        toyToEdit(state) {
            return state.toyToEdit
        }
    },
    mutations: {
        setFilter(state, { filter }) {
            state.filterBy = filter
        },
        query(state, { toys }) {
            state.toys = toys
        },
        setToyToEdit(state, { toy }) {
            state.toyToEdit = toy
        },
        updateToy(state, { toy }) {
            const idx = state.toys.findIndex(t => {
                return t._id === toy._id
            })
            state.toys.splice(idx, 1, toy)
        },
        addToy(state, { toy }) {
            state.toys.push(toy)
        },
        remove(state, { id }) {
            const idx = state.toys.findIndex(t => {
                return t._id === id
            })
            state.toys.splice(idx, 1)
        }
    },
    actions: {
        query({ commit }) {
            return toyService.query()
                .then(toys => {
                    commit({ type: 'query', toys })
                })
        },
        getToyToEdit({ commit }, { id }) {
            if (!id) {
                const toy = toyService.getEmptyToy()
                commit({ type: 'setToyToEdit', toy })
                const toyCopy = JSON.parse(JSON.stringify(toy));
                return toyCopy
            } else {
                return toyService.getById(id)
                    .then(toy => {
                        const toyCopy = JSON.parse(JSON.stringify(toy));
                        commit({ type: 'setToyToEdit', toy })
                        return toyCopy
                    })
            }
        },
        saveToy({ commit }, { toy }) {
            const type = (toy._id) ? 'updateToy' : 'addToy'
            return toyService.save(toy)
                .then(toy => {
                    commit({ type, toy })
                })
        },
        removeToy({ commit }, { id }) {
            return toyService.remove(id)
                .then(() => {
                    commit({ type: 'remove', id })
                })
        },
    },
    modules: {
    }
}