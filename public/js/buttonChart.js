let dataButtons = [
    { label:'Button Up', y:0},
    { label:'Button Down', y:0}
];

const chartButtonPush = document.querySelector('#chartButtonPush');

if(chartButtonPush){
    const chart = new CanvasJS.Chart('chartButtonPush', {
        animationEnabled: true,
        theme: 'theme1',
        title:{
            text: 'Button Push'
        },
        data: [
            {
                type: 'column',
                dataPoints:dataButtons
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

    var channel = pusher.subscribe('button');
    channel.bind('button-e', function(data) {
        dataButtons = dataButtons.map( x => {
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