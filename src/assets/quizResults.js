export function getLocalResult() {
    let result = localStorage.getItem("result");
    if (!result) {
        localStorage.setItem("result", JSON.stringify([]));
        result = "[]";
    }
    return JSON.parse(result);
}