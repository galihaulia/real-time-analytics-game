let dataActive = [
    { label:'Incorrect', y:0},
    { label:'Correct', y:0},
    { label:'Shop', y:0}
];

const chartKeberhasilan = document.querySelector('#chartKeberhasilan');

if(chartKeberhasilan){
    const chart = new CanvasJS.Chart('chartKeberhasilan', {
        animationEnabled: true,
        theme: 'theme1',
        title:{
            text: 'Aktivitas Player'
        },
        data: [
            {
                type: 'column',
                dataPoints:dataActive
            }
        ]
    });
    chart.render();

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('79878da23c4fd7ff4af2', {
      cluster: 'ap1',
      forceTLS: true
    });

    var channel = pusher.subscribe('active');
    channel.bind('active-e', function(data) {
        dataActive = dataActive.map( x => {
            if(x.label == data.object_name){
                x.y += data.points;
                return x;
            }else{
                return x;
            }
        })
        chart.render();
    });
}