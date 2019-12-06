$(function () {
   redirect = false // global variable == true ? redirect to search.html

   var st = { // API Settings
      default_url: 'https://www.googleapis.com/youtube/v3/search?part=id%2C+snippet',
      api_key: 'AIzaSyA4ChC9gzj1gOdHUTkCmxfbTD4SuNQr8iM',
      max_results: 50
   },
   history = JSON.parse(localStorage.getItem('history')),
   goToHistory = Array.isArray(history) ? history : [];

   function errorsToggle(e, className) {
      if (e === 'show') {
         $(className).fadeIn(250)

      } else {
         $(className).fadeOut(250)
      }
   }

   $('form').on('submit', function(e) {
      e.preventDefault()

      var value = $('input[name="search"]').val().trim();

      if (value) { // if input is not empty
         valuefilter = '';
         
         if (value.lastIndexOf('/') + 1 === value.length) {
            valuefilter = value.slice(value.lastIndexOf('UC'), value.length - 1)

         } else {
            valuefilter = value.slice(value.lastIndexOf('UC'), value.length)
         }

         if (valuefilter.length > 1) {
            errorsToggle('hide', '.v_url_id')
            $.ajax({
               method: 'GET',
               url: `
                  ${st.default_url}&channelId=${valuefilter}&maxResults=${st.max_results}&fields=items(id%2Csnippet(channelId%2CchannelTitle%2Cdescription%2CpublishedAt%2Cthumbnails%2Ctitle))%2Ckind%2CnextPageToken%2CpageInfo%2CprevPageToken%2CregionCode%2CtokenPagination&key=${st.api_key}
               `,
               success: function(data) {
                  if (data.items.length) {
                     localStorage.setItem('info_channel', JSON.stringify(data))

                     errorsToggle('hide', '.connact_err')

                     goToHistory.push({
                        id: data.items[0].snippet.channelId, 
                        name: data.items[0].snippet.channelTitle,
                        date: new Date()
                     })

                     localStorage.setItem('history', JSON.stringify(goToHistory))

                     redirect = true

                     $('.boxFullRedirect').fadeIn(0)

                  } else {
                     errorsToggle('show', '.connact_err')
                  }
               },
               error: function() {
                  errorsToggle('show', '.connact_err')
               },
               complete: function(xhr) {
                  if (redirect && xhr.status === 200) {
                     window.setInterval(function() {
                        window.location.replace('/search.html')
                     }, 2000)
                  }
               }
            })
            
         } else {
            errorsToggle('show', '.v_url_id')
         }
      } else {
         errorsToggle('show', '.v_url_id')
      }
   })

   if (Array.isArray(history)) {
      $('.history .empty').css('display', 'none')
      $('#history').css('display', 'block')

      history.forEach(function(item) {
         $('#history').prepend(`
            <div>
               <div class="who">
                  <span>${item.name}</span>
                  <span>${item.id}</span>
               </div>
               <span>${moment(item.date).fromNow()}</span>
            </div>
         `)
      })

   } else {
      $('#history').css('display', 'none')
      $('.history .empty').css('display', 'block')
   }
})