const result = [
]

if (!result)
    localStorage.setItem("result", JSON.stringify(result));

const localResult = JSON.parse(localStorage.getItem("result")) || [];

export { localResult }