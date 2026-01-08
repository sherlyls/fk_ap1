import {useEffect, useState} from 'react'
import {fetchProducts} from '../api/products'

export default function Home () {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function load() {
            try {
                const result = await fetchProducts({limit: 10, skip: 0})
                setData(result)
            }
            catch (err) {
                setError(err.message)
            }
            finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>

    return (
        <div>
        <h1>Products</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}