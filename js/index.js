$(function () {
   $('form').on('submit', function(e) {
      e.preventDefault()

      var st = {
         default_url: 'https://www.googleapis.com/youtube/v3',
         api_key: 'AIzaSyA4ChC9gzj1gOdHUTkCmxfbTD4SuNQr8iM',
         channel_id: 'UCf5eV04TeNt8k6hNKAsbgfw',
         max_results: 5
      }
   
      $.ajax({
         method: 'GET',
         url: `
            ${st.default_url}/search?part=snippet&channelId=${st.channel_id}&maxResults=${st.max_results}&key=${st.api_key}
         `,
         success: function(data, xhr, status) {
            console.log(data)
            console.log(xhr)
            console.log(status)
         }
      })
   })
})