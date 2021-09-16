export const Resources = [
    {
      id: "r1",
      name: "Resource1"
    }
  ];
  
  const e1 = {
    id: 1,
    start: "2017-12-18 09:30:00",
    end: "2017-12-18 12:30:00",
    resourceId: "r1",
    title: "A"
  };
  
  const e2 = {
    id: 2,
    start: "2017-12-18 11:00:00",
    end: "2017-12-18 14:30:00",
    resourceId: "r1",
    title: "B"
  };
  
  export const WorkingEvents = [e1, e2];
  
  export const NonWorkingEvents = [e2, e1];
  
  export const WorkaroundEvents = [...NonWorkingEvents].sort(function(a, b) {
    var dateA = new Date(a.start),
      dateB = new Date(b.start);
    return dateA - dateB; //sort by date ascending
  });
  