export async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works")
    const data = await response.json()
    return data
}

export async function getCategories() {
    const responseCategories = await fetch("http://localhost:5678/api/categories")
    const categories = await responseCategories.json()
    return categories
}
