// key = AIzaSyC3Uae2cxrss-MgXU3XyoXXh6As_4ffE4Y


$(document).ready(function(){

    let API_key = "AIzaSyC3Uae2cxrss-MgXU3XyoXXh6As_4ffE4Y"
    
    $('.submit').click(function(){

        let search = $('input').val()

        videoSearch(API_key,search,5)
    })

    function videoSearch (key, search, limit) {

        $.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${limit}&order=relevance&q=${search}&key=${key}`, 
        function(data){
            console.log(data);
            // console.log(data.items[0].snippet);
            let img = null
            let title = null
            let user = null
            let time = null
            let description = null
            let display = ''

            data.items.forEach(item => {
                
                img = item.snippet.thumbnails.default.url
                title = item.snippet.title
                time = item.snippet.publishedAt
                user = item.channelTitle
                description = item.snippet.description

                display +=`
                <li>
                    <div class="pic">
                        <img src=${img} alt="" />
                    </div>
                    <div class="content">
                        <h3>${title}</h3>
                        <span>${time}</span>
                        <span>${item}</span>
                        <p>
                        ${description}
                        </p>
                    </div>
                </li>
                `
            });
            $('.result ul').html(display)
            
        })

    }

})

// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=relevance&q=${q}&key=AIzaSyBs4RcftfDFAtDE9ndaHFaZAtCYKVMCIfI