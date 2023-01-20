// import { useFocusEffect } from "@react-navigation/native"
import { useEffect, useState } from "react"

export const useCategory = (e?: any) => {
    const [categories, setCategories] = useState<any>([
        {
            name: 'spożywcze'
        },
        {
            name: 'samochód'
        },
        {
            name: 'opłaty'
        }
    ])

    const handleCategories = () => {
        setCategories([...categories, e])
    }

    useEffect(()=>{
        handleCategories()
    }, [categories])

    return [categories, setCategories]
}