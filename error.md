

✅ RESOLVED - Import error fixed in AssuranceRegisterTelecomForm.jsx

Previously attempted import error: 'addData' is not exported from '../../../reducer/store/AssetRegisterReducer' (imported as 'addData').

Fixed by changing import from:
```javascript
import { addData } from "../../../reducer/store/AssetRegisterReducer";
```
to:
```javascript
import { addAssetRegister } from "../../../reducer/store/AssetRegisterReducer";
```

And updating the dispatch call from:
```javascript
await dispatch(addData(formValues));
```
to:
```javascript
await dispatch(addAssetRegister(formValues));
```

Build should now compile successfully.