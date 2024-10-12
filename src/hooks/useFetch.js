import { useState } from "react"

export const useFetch = () => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        error: null
    })

    const { data, isLoading, error } = state

    const fetchData = async (url, method, bodyData = null) => {
        if (!url) return
        try {

            const options = {
                method: method,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: method == 'GET' || method == 'DELETE' ? null : JSON.stringify(bodyData)
            }

            const res = await fetch(url, options)
            const data = await res.json()
            if(data.length === 0) throw new Error("No encontrado")  
            console.log(data)
            setState({
                data: data,
                isLoading: false,
                error: null
            })
        }
        catch (error) {
            console.log("entre al error")
            setState({
                data: null,
                error: error.message,
                isLoading: false,
            })
        }
    }

    return {
        data,
        isLoading,
        error,
        fetchData
    }
}