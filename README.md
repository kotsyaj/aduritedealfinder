# adurite deal finder (manual)
this is just something i whipped up trying to learn javascript

## how to use:
go to adurite.com and paste whats below into ur console

> $.ajax({ url: '/api/get-items-onsite', type: 'post', headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}, success: function (data) {console.log(data)}});

once you've done that wait for something to pop up saying "ok: true", right click that and click copy object
put that file into the same folder as the deal finder and name it "items.json"
go to the getDeals function. change it to whatever rate u want and run the deal finder
a file named dealfinder.txt should appear containing all the deals found
