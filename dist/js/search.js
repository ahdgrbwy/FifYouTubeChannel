var data = JSON.parse(window.localStorage.getItem('info_channel'));

if (data && Array.isArray(data.items)) {
   var info = [
      {id: 1, title: 'Channel ID', content: data.items[0].snippet.channelId},
      {id: 2, title: 'Channel Name', content: data.items[0].snippet.channelTitle},
      {id: 3, title: 'Videos Uploaded', content: data.pageInfo.totalResults},
      {
         id: 4, 
         title: 'Displayed Here', 
         content: data.pageInfo.totalResults < data.pageInfo.resultsPerPage
                  ? data.pageInfo.totalResults : data.pageInfo.resultsPerPage
      },
   ]

   info.forEach(function(item) {
      $('.info .row').append(`
         <div class="col-md-6 col-lg-3">
            <div class="details">
               <h4>${item.title}</h4>
               <span>${item.content}</span>
            </div>
         </div>
      `)
   });

   ///////// start videos ////
   var notVideoLength = data.items.filter(function(item) {
      return item.id.videoId == undefined
   }).length;

   $('.videos .title span').text(`[${info[3].content}] only`);

   $('.videos .title').click(function() { // toggle videos off/on
      $('.videos .view').fadeToggle(250);
      $('.videos .title i').toggleClass('fa-toggle-off fa-toggle-on')
   });

   $('.filter #deleted').html(`${notVideoLength} items have been deleted`);

   data.items.forEach(function(item) {
      if (item.id.videoId == undefined) return false;

      $('.videos .view .row').append(`
         <div class="col-sm-6 col-lg-3">
            <div class="video" onclick="window.open('https://www.youtube.com/watch?v=${item.id.videoId}')">
               <img src="${item.snippet.thumbnails.medium.url}" alt="photo">
               <div>
                  <div class="name">${item.snippet.title}</div>
                  <ul>
                     <li><i class="fas fa-globe"></i> ${item.id.videoId}</li>
                     <li><i class="fas fa-calendar-alt"></i> ${moment(item.snippet.publishedAt).fromNow()}</li>
                  </ul>
                  <div class="description"><span>Description:</span>${item.snippet.description}</div>
               </div>
            </div>
         </div>
      `)
   });

} else {
   $('.app .container').append('<div class="error">Please search for a channel to display here</div>');
   $('.error').fadeIn(250);
}