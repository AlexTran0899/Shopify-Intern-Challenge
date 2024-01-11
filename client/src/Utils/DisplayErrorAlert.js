const displayErrorAlert = (error) => {
    if(error.response?.data?.message){
        const friendlyErrorMessage = error.response.data.message
        alert(friendlyErrorMessage)
    } else {
        alert('unknown error')
    }

}
export default displayErrorAlert;