# Exercise marking system architectural documentation

## Frontend

The frontend buzzwords are react, redux, immutable.js, npm, webpack, react-router and ES6.

The routes for the app are defined in src/routes.jsx. They follow a pattern of 

    <Route path="[url]" component="[component-responsible-for-handling-url]"> 

#### Displaying application state

The routes always point to a top-level "smart" react component called containers (components that are aware of application state). These components have one or many "dumb" react components (that are not aware of application state, and only recieve data as props from upper-tier components), which in turn can also have as many dumb react components as they wish.

#### Modifying application state

Application state handling uses Redux and data types Immutable.js. To change state you need to fire an action. These are defined at src/actions/ and are passed to dumb components via containers as props. The actions contain the action signature and possibly a data payload.

The reducers in src/reducers listen to all application actions. If they get an action they're defined to respond to they'll calculate the new state from last state and payload.

To persist the changes the actions can make an API call to the backend. The functionality has been abstracted to the CALL_API middleware where an action follows the form of

    {
      [CALL_API]: {
        types: [
          ACTION_FIRED_WHEN_TRANSACTION_STARTS
          ACTION_FIRED_WHEN_TRANSACITON_SUCCESSFUL
          ACTION_FIRED_WHEN_TRANSACTION_UNSUCCESFUL
        ],
        endpoint: '[endpoint-url]',
        (optional) method: '[http-method]',
        (if method === post/put) body: [request-body],
        (optional) validate: [validation-rules]
      }
    }

See also the [Backend architecture documentation]()
