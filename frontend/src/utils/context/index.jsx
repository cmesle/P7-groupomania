import { createContext, useState } from "react"


/*---------------------------------------------------------- FILTER CONTEXT */
/* toggling posts display (all vs user's) */
export const FilterContext = createContext()

export const FilterProvider = ({ children }) => {
    const [filter, setFilter] = useState('allPosts')
    const toggleFilter = () => {
        setFilter(filter === 'myPosts' ? 'allPosts' : 'myPosts')
    }

    return (
        <FilterContext.Provider value={{ filter, toggleFilter }}>
            {children}
        </FilterContext.Provider>
    )
}

/*---------------------------------------------------------- REFRESH CONTEXT */
/* refreshing PostsList after deleting post */
export const RefreshContext = createContext()
export const RefreshProvider = ({ children }) => {
    const [refresh, setRefresh] = useState(0)
    const toggleRefresh = () => {
        setRefresh(refresh === 0 ? 1 : 0)
    }
    return (
        <RefreshContext.Provider value={({ refresh, toggleRefresh })}>
            {children}
        </RefreshContext.Provider>
    )
}