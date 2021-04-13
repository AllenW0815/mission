// key 從 google cloud platform 取得
$(document).ready(function(){

    let key = "AIzaSyC3Uae2cxrss-MgXU3XyoXXh6As_4ffE4Y"
    
    $('.submit').click(function(){

        let search = $('input').val()
        videoSearch(key,search,5)
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
            let video = null
            let display = ''

            data.items.forEach(item => {
                
                img = item.snippet.thumbnails.default.url
                title = item.snippet.title
                time = item.snippet.publishedAt
                user = item.snippet.channelTitle
                description = item.snippet.description
                video = item.id.videoId

                display +=`
                <li>
                    <div class="pic">
                    <a data-fancybox href="http://www.youtube.com/embed/${video}">
                    <img src=${img} alt="" />
                    </a>
                    </div>
                    <div class="content">
                         <a data-fancybox href="http://www.youtube.com/embed/${video}">
                          <h3>${title}</h3>   
                        </a>
                        <span>${time}</span>
                        <span>${user}</span>
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