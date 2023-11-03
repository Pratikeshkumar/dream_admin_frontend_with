
const live_count = async (socket, io) => {


    socket.on('start_live_stream', (data) => {
        console.log(data?.main_stream_url)
    })


}





module.exports = {
    live_count
}