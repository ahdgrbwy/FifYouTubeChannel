$(function () {
   
   var st = {
      default_url: 'https://www.googleapis.com/youtube/v3',
      api_key: 'AIzaSyA4ChC9gzj1gOdHUTkCmxfbTD4SuNQr8iM',
      max_results: 50
   }

   function errorsToggle(e) {
      if (e === 'show') {
         $('.errors').fadeIn(250)
      } else {
         $('.errors').fadeOut(250)
      }
   }

   $('form').on('submit', function(e) {
      e.preventDefault()

      var value = $('input[name="search"]').val().trim();

      if (value) {

         valuefilter = '';
         
         if (value.lastIndexOf('/') + 1 === value.length) {
            valuefilter = value.slice(value.lastIndexOf('UC'), value.length - 1)
         } else {
            valuefilter = value.slice(value.lastIndexOf('UC'), value.length)
         }

         if (valuefilter.length > 1) {
            errorsToggle('hide')

            $.ajax({
               method: 'GET',
               url: `
                  ${st.default_url}/search?part=snippet&channelId=${valuefilter}&maxResults=${st.max_results}&key=${st.api_key}
               `,
               success: function(data, xhr, status) {
                  console.log(data)
                  console.log(xhr)
                  console.log(status)
               }
            })
         } else {
            errorsToggle('show')
         }
      } else {
         errorsToggle('show')
      }
   })
})