 const timeout = setTimeout(() => {
      window.location.reload(); // Refresh the page
    }, 1000)
    
function getLastParameter() {
const pathname = window.location.pathname;
const pathSegments = pathname.split("/").filter(Boolean);
return pathSegments[pathSegments.length - 1];
}
const navigate = useNavigate();
const [slug, setSlug] = useState(getLastParameter().trim());


const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  }

import stationData from "../../station.json";




department
: 
"AFC-Mainline"
designation
: 
""
employeeid
: 
"09999"
message
: 
"Login Successfully."
name
: 
"Testing Mainline"
profileid
: 
128
role
: 
"Employee"
station
: 
"1"
statusCode
: 
200
success
: 
true

<div className="col-md-6">
                  <label for="inputstation" className="form-label">
                    Station
                  </label>

                  <select
                    className="form-control"
                    id="inputstation"
                    value={formValues.station}
                    onChange={(e) =>
                      setFormValues({ ...formValues, station: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Station</option>
                    {stationData
                      .filter((station) => station["Station Name"]) // Exclude entries with null station names
                      .map((station) => (
                        <option
                          key={station["STATION Code"]}
                          value={station["Station Name"]}
                        >
                          {station["Station Name"]}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

{
"type": "data/fetchData/rejected",
"meta": {
"requestId": "Vhl3nG0vTvOypRUp5exK4",
"rejectedWithValue": false,
"requestStatus": "rejected",
"aborted": false,
"condition": false
},
"error": {
"name": "TypeError",
"message": "Cannot destructure property 'formType' of 'undefined' as it is undefined.",
"stack": "TypeError: Cannot destructure property 'formType' of 'undefined' as it is undefined.\n at http://localhost:3000/static/js/bundle.js:322020:3\n at http://localhost:3000/static/js/bundle.js:621190:79\n at http://localhost:3000/static/js/bundle.js:621224:10\n at http://localhost:3000/static/js/bundle.js:929991:14\n at http://localhost:3000/static/js/bundle.js:620573:34\n at http://localhost:3000/static/js/bundle.js:620383:12\n at http://localhost:3000/static/js/bundle.js:460204:5\n at commitHookEffectListMount (http://localhost:3000/static/js/bundle.js:594170:30)\n at commitPassiveMountOnFiber (http://localhost:3000/static/js/bundle.js:595663:17)\n at commitPassiveMountEffects_complete (http://localhost:3000/static/js/bundle.js:595635:13)"
}
}
