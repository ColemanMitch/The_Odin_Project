!function(){"use strict";const e=({title:e,desc:t,project:o,dueDate:r,priority:i,complete:c})=>({title:e,desc:t,project:o,dueDate:r,priority:i,complete:c,toggleComplete(){this.complete=!c},changePriority(){this.priority=3}});let t=e({title:"Laundry",desc:"My clothes is dirty!",project:"Chores",dueDate:"tomorrow",priority:2,complete:!1});e({title:"Vacuum",desc:"The rug is grody!",project:"Chores",dueDate:"tomorrow",priority:3,complete:!1});console.log(t)}();