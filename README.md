## Integrate [Become Re-Verefication service](https://becomedigital.net/) to your website with Become web button

How it looks like in your code:

```html
<become-reverification-button
  userId="<YOUR_USER_ID>"
  contractId="<YOUR_CONTRACT_ID>"
  token="<YOUR_JWT_TOKEN>"
/>
```

How it looks like on your page:

<img src="https://gist.githubusercontent.com/Tyg0th/15c5131ef7d2b24b9effa97eb45dedce/raw/07a5e1f3e428bd1d32bfe2940591872e1ae1ec2d/become-button-example.jpg" width="211" />

### Integrate

Add the following script to your `html`:

```html
<script src="https://onboarding.svi.becomedigital.net/resources/reverification-button.js"></script>
```

Use and declare the `userId`, `contractId`, and `token` in the custom element:

```html
<become-reverification-button
  userId="<YOUR_USER_ID>"
  contractId="<YOUR_CONTRACT_ID>"
  token="<YOUR_JWT_TOKEN>"
/>
```
*Note*: You can also create the button dynamically using JavaScript. Use the `createElement` method, and then apply `setAttribute` to define the attributes. You can also handle or simulate a `click event` to control whether or not to display the button on your page.

### API

### Re-verification

Once a user has completed the onboarding process, they will be able to authenticate using facial biometrics and proof of life (liveness detection), without needing to present their identity document again.

- [Reverification API](https://documenter.getpostman.com/view/2293906/T1DtdvBk?version=latest#06c03291-3e2f-4f66-bf6d-a7bf179d17df)

#### Button attributes

| Attribute name | Description                                                                              |
| -------------- | ---------------------------------------------------------------------------------------- |
| `userId`       | The custom unique identifier assigned during the previous validation process.                      |
| `contractId`   | Contract identifier for validation type                                                  |
| `token`        | The JWT token generated for API requests, created using company credentials. |
| `country`      | 2 characters country identifier (default: "CO" - Colombia) Example of use: "FR" (France) |
| `state`        | 2 charactes state identifier (only available for US states when country is "US"          |

#### Events

You can subscribe to events emitted by the button to track the re-verification process. The most important events include:

| EventName                  | Description                                                           |
| -------------------------- | --------------------------------------------------------------------- |
| become:sdkLoaded           | Indicates that the SDK was loaded successfully.                       |
| become:verificationStarted | Notifies that the re-verification process has started.                                |
| become:result              | Indicates the successful completion of the re-verification process; data is returned. |
| become:userFinishedSdk     | Notifies that the user clicked the continue button to close the SDK. Only emmited when the verification proccess is OK                  |
| become:exitedSdk           | Indicates that the user exited the process manually using the close button. Here users may complete the proccess or not              |

When the `result` event is triggered, the following data is returned:

```json
{
  "userId": "test_1",
  "livenessConficence": 99.91615295410156,
  "auditImages": [
    {
      "BoundingBox": {
        "Height": 283.93048095703125,
        "Left": 218.52137756347656,
        "Top": 105.67168426513672,
        "Width": 193.6444854736328
      },
      "Bytes": ""
    }
  ],
  "referenceImage": {
    "BoundingBox": {
      "Height": 287.81195068359375,
      "Left": 206.05030822753906,
      "Top": 76.31394958496094,
      "Width": 201.10231018066406
    },
    "Bytes": ""
  },
  "data": {
    "company": "<YOUR_COMPANY_ACCOUNT_NAME>",
    "user_id": "<USER_ID>",
    "result": false,
    "confidence": 0.20414
  }
}
```

## Result Object

| Key        | Type             | Description                                                                                                                         |
| ---------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| livenessConficence | Number (Decimal) | The percentage of confidence in the user's liveness during the challenge. If the score is >= 75, it indicates the user is likely a real person (not necessarily that the user is who they claim to be). |
| auditImages | Array | An array containing the images used as base images for liveness verification. |
| referenceImage | Object | The reference image used to compare and verify if the user is live. |
| data | Object | The result of the comparison between the most recent selfie and the one attached to the userId. |
| userId | String | The unique identifier used to initiate the re-verification process. |

Note:

- `auditImages.Bytes` and `referenceImage.Bytes` are Base64-encoded images. These images are not saved on our end, so if you need them, please ensure you handle them appropriately.

### Data information
`data` contains the response from our service, indicating whether the user is who they claim to be.

| Key        | Type             | Description                                                                                                                         |
| ---------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| comapnyId | String | The company ID from where the user was  onboarded (your company). |
| userId | String | The user ID of the individual (same as provided). |
| result | Boolean | Indicates whether the user passed re-verification. `true` means the user is verified; `false` means they are not. |
| confidence | Number (Decimal) | The comparison score between the sent selfie and the one attached to the userId. You can use this value for custom logic if needed, based on your business rules. |


### Example

- Minimal usage:
  - Vanilla JS: see `index.html`
- Using the Image to call re-verfication API `examples/index.js`
