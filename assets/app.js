var app=angular.module("app",[]).controller("AppCtrl",["$scope","CalcSvc",function(e,a){e.submit=function(){region=e.player.region,name=e.player.name,a.getTilt(region,name)}}]),app=angular.module("app").service("CalcSvc",["$http",function(e){var a=this;a.getTilt=function(a,t){current_game="/api/current/"+a+"/"+t,history_root="/api/history/"+a+"/",e.get(current_game).then(function(a){console.log("CurrentGame:",a),players=a.data.participants,current_start=a.data.gameStartTime,e.get(history_root+players[0].summonerId).then(function(e){player=players[0],console.log("Player:",player),console.log("All Games:",e.data.games)})})}}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImNhbGMuc3ZjLmpzIl0sIm5hbWVzIjpbImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiQ2FsY1N2YyIsInN1Ym1pdCIsInJlZ2lvbiIsInBsYXllciIsIm5hbWUiLCJnZXRUaWx0Iiwic2VydmljZSIsIiRodHRwIiwic3ZjIiwidGhpcyIsImN1cnJlbnRfZ2FtZSIsImhpc3Rvcnlfcm9vdCIsImdldCIsInRoZW4iLCJjdXJyZW50R2FtZSIsImNvbnNvbGUiLCJsb2ciLCJwbGF5ZXJzIiwiZGF0YSIsInBhcnRpY2lwYW50cyIsImN1cnJlbnRfc3RhcnQiLCJnYW1lU3RhcnRUaW1lIiwic3VtbW9uZXJJZCIsInBsYXllckhpc3RvcnkiLCJnYW1lcyJdLCJtYXBwaW5ncyI6IkFBQUEsR0FBQUEsS0FBQUMsUUFBQUMsT0FBQSxVQUNBQyxXQUFBLFdBQUEsU0FBQSxVQUFBLFNBQUFDLEVBQUFDLEdBQ0FELEVBQUFFLE9BQUEsV0FDQUMsT0FBQUgsRUFBQUksT0FBQUQsT0FDQUUsS0FBQUwsRUFBQUksT0FBQUMsS0FDQUosRUFBQUssUUFBQUgsT0FBQUUsVUNMQVQsSUFBQUMsUUFBQUMsT0FBQSxPQUNBUyxRQUFBLFdBQUEsUUFBQSxTQUFBQyxHQUNBLEdBQUFDLEdBQUFDLElBQ0FELEdBQUFILFFBQUEsU0FBQUgsRUFBQUUsR0FDQU0sYUFBQSxnQkFBQVIsRUFBQSxJQUFBRSxFQUNBTyxhQUFBLGdCQUFBVCxFQUFBLElBRUFLLEVBQUFLLElBQUFGLGNBQ0FHLEtBQUEsU0FBQUMsR0FDQUMsUUFBQUMsSUFBQSxlQUFBRixHQUNBRyxRQUFBSCxFQUFBSSxLQUFBQyxhQUNBQyxjQUFBTixFQUFBSSxLQUFBRyxjQUVBZCxFQUFBSyxJQUFBRCxhQUFBTSxRQUFBLEdBQUFLLFlBQ0FULEtBQUEsU0FBQVUsR0FDQXBCLE9BQUFjLFFBQUEsR0FDQUYsUUFBQUMsSUFBQSxVQUFBYixRQUNBWSxRQUFBQyxJQUFBLGFBQUFPLEVBQUFMLEtBQUFNIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZShcImFwcFwiLCBbXSlcbi5jb250cm9sbGVyKFwiQXBwQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsIENhbGNTdmMpIHtcbiAgJHNjb3BlLnN1Ym1pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHJlZ2lvbiA9ICRzY29wZS5wbGF5ZXIucmVnaW9uXG4gICAgbmFtZSA9ICRzY29wZS5wbGF5ZXIubmFtZVxuICAgIENhbGNTdmMuZ2V0VGlsdChyZWdpb24sIG5hbWUpXG4gIH1cbn0pXG4gICBcblxuXG4iLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoXCJhcHBcIilcbi5zZXJ2aWNlKFwiQ2FsY1N2Y1wiLCBmdW5jdGlvbigkaHR0cCkgeyAgXG4gIHZhciBzdmMgPSB0aGlzXG4gIHN2Yy5nZXRUaWx0ID0gZnVuY3Rpb24ocmVnaW9uLCBuYW1lKSB7XG4gICAgY3VycmVudF9nYW1lID0gXCIvYXBpL2N1cnJlbnQvXCIgKyByZWdpb24gKyBcIi9cIiArIG5hbWVcbiAgICBoaXN0b3J5X3Jvb3QgPSBcIi9hcGkvaGlzdG9yeS9cIiArIHJlZ2lvbiArIFwiL1wiXG5cbiAgICAkaHR0cC5nZXQoY3VycmVudF9nYW1lKVxuICAgIC50aGVuKGZ1bmN0aW9uKGN1cnJlbnRHYW1lKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnRHYW1lOlwiLCBjdXJyZW50R2FtZSlcbiAgICAgIHBsYXllcnMgPSBjdXJyZW50R2FtZS5kYXRhLnBhcnRpY2lwYW50c1xuICAgICAgY3VycmVudF9zdGFydCA9IGN1cnJlbnRHYW1lLmRhdGEuZ2FtZVN0YXJ0VGltZVxuXG4gICAgICAkaHR0cC5nZXQoaGlzdG9yeV9yb290ICsgcGxheWVyc1swXS5zdW1tb25lcklkKVxuICAgICAgIC50aGVuKGZ1bmN0aW9uKHBsYXllckhpc3RvcnkpIHtcbiAgICAgICAgcGxheWVyID0gcGxheWVyc1swXVxuICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXllcjpcIiwgcGxheWVyKVxuICAgICAgICBjb25zb2xlLmxvZyhcIkFsbCBHYW1lczpcIiwgcGxheWVySGlzdG9yeS5kYXRhLmdhbWVzKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG59KVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
