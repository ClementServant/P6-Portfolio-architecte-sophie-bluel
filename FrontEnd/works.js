export async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works")
    const works = await response.json()
    return works
}
