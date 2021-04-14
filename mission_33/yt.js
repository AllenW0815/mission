// key 從 google cloud platform 取得
$(document).ready(function(){

    let key = "AIzaSyC3Uae2cxrss-MgXU3XyoXXh6As_4ffE4Y"
    let key2 = "AIzaSyAR5RPNsaVqHdtlYeNjtQQm12R8KSzsnHY"
    
    $('.submit').click(function(){
        let q = $('input').val()
        videoSearch(key2,q,5)
    })

    function videoSearch (key, q, limit) {
        $.get('https://www.googleapis.com/youtube/v3/search', 
        {
            part: "snippet,id",
            q: q,
            type: "video",
            key: key,
            maxResults:limit  ,
        },
        function(data){
            // console.log(data);
            let nextPageToken = data.nextPageToken
            let prevPageToken = data.prevPageToken
            // console.log(nextPageToken);
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
                time = item.snippet.publishedAt.slice(0,10)
                user = item.snippet.channelTitle
                description = item.snippet.description
                video = item.id.videoId

                display +=`
                <li>
                    <div class="pic">
                    <a class="fresco" href="https://www.youtube.com/embed/${video}">
                    <img src=${img} alt="" />
                    </a>
                    </div>
                    <div class="content">
                         
                          <h3>
                          <a class="fresco" href="https://www.youtube.com/embed/${video}">
                          ${title}
                          </a></h3>   
                         
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

            let btns = createBtn(nextPageToken,prevPageToken,q)
            $('.pages').html(btns)
            $('#prev').on('click',prevPage)           
            $('#next').on('click',nextPage)           
        })
        function createBtn(nextPageToken,prevPageToken,q){
            let output = ''
            if(!prevPageToken){
                output = `
                <button class="switch" id="next" data-token=${nextPageToken} data-query=${q} onclick="nextPage()">
                  <i class="fas fa-arrow-circle-right"></i>
                </button>
                `
            }else{
                output = `
                <button class="switch" id="prev" data-token=${prevPageToken} data-query=${q} onclick="prevPage()">
                   <i class="fas fa-arrow-circle-left"></i>
                </button>
                <button class="switch" id="next" data-token=${nextPageToken} data-query=${q} onclick="nextPage()">
                  <i class="fas fa-arrow-circle-right"></i>
                </button>
                `
            }
             return output
        }
        function nextPage(){
            let token = $('#next').data('token')
            let q = $('#next').data('query')
            
            $.get('https://www.googleapis.com/youtube/v3/search', 
            {
                part: "snippet,id",
                q: q,
                type: "video",
                key: key,
                pageToken: token,
                maxResults: limit,
            },
            function(data){
                // console.log(data);
                let nextPageToken = data.nextPageToken
                let prevPageToken = data.prevPageToken
                // console.log(nextPageToken);
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
                        <a data-fancybox href="https://www.youtube.com/embed/${video}">
                        <img src=${img} alt="" />
                        </a>
                        </div>
                        <div class="content">
                             <a data-fancybox href="https://www.youtube.com/embed/${video}">
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
    
                let btns = createBtn(nextPageToken,prevPageToken,q)
                $('.pages').html(btns)
                $('#prev').on('click',prevPage)           
                $('#next').on('click',nextPage)
            }) 
        }
        function prevPage(){
            let token = $('#prev').data('token')
            let q = $('#next').data('query')
            
            $.get('https://www.googleapis.com/youtube/v3/search', 
            {
                part: "snippet,id",
                q: q,
                type: "video",
                key: key,
                pageToken: token,
                maxResults: limit,
            },
            function(data){
                // console.log(data);
                let nextPageToken = data.nextPageToken
                let prevPageToken = data.prevPageToken
                // console.log(nextPageToken);
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
                        <a data-fancybox href="https://www.youtube.com/embed/${video}">
                        <img src=${img} alt="" />
                        </a>
                        </div>
                        <div class="content">
                             <a data-fancybox href="https://www.youtube.com/embed/${video}">
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
    
                let btns = createBtn(nextPageToken,prevPageToken,q)
                $('.pages').html(btns)
                $('#prev').on('click',prevPage)           
                $('#next').on('click',nextPage)
            }) 
        }       
    }



})