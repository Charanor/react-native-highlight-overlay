# Highlight overlay

A tinted overlay that allows one or more elements to be highlighted (non-tinted). 
Works with all types of components; native, function, class, etc.

Supports switching between highlights, useful for a "tutorial" / "walkththrough" flow
where you step the user through different parts of a screen. Also very useful for
highlighting an element when the user enters the app from a deep link.

<p align="center">
  <img src="https://user-images.githubusercontent.com/16232214/137453222-06d4987c-8041-4942-9c57-e85071fb3bd2.gif" height="500" />
</p>

### ⚠️ Caveats ⚠️
 - If the `highlightedElementId` given to the `HighlightOverlay` does not
   correspond to an existing `HighlightableElement`, the overlay will be shown
   without any highlight. Might change this in the future. For now make sure
   the id always exists.
 - In certain setups, the position of the highlighted element might be off by a
   fraction. If this happens to you, set the `rootRef` of
   `HighlightableElementProvider` manually to the root element of your app. 
   However in most circumstances this is not necessary.
 - If your `HighlightedElement` is inside a scroll view (like in the demo video above)
   the `HighlightOverlay` must also be inside the scroll view, otherwise the highlighted
   element will not properly overlay the "root" element. This is because of how React Native handles
   measuring positions & sizes. I'm working on possible fixes to make this more
   user-friendly.
 - If you want to conditionally render a `HighligtableElement`, you must instead conditionally render the contents of the element:
   ```
   // From:
   {showElement && (
     <HighligtableElement>
       <OtherComponent />
     </HighligtableElement>
   )}
   
   // To
   <HighligtableElement>
     {showElement && (
       <OtherComponent />
     )}
   </HighligtableElement>
   ```
   `HighligtableElement` is an unstyled `View`, but it is non-collapsible so it won't get optimized away. This shouldn't change how your app is displayed, except in rare circumstanses.

## Installation

This package is available in the npm registry as [react-native-highlight-overlay](https://www.npmjs.com/package/react-native-highlight-overlay).

```sh
# npm
npm install react-native-highlight-overlay

# yarn
yarn add react-native-highlight-overlay
```

## Usage

```js
import {
    HighlightableElement,
    HighlightableElementProvider,
    HighlightOverlay,
} from "react-native-highlight-overlay";

// Remember to wrap the ROOT of your app in HighlightableElementProvider!
return (
    <HighlightableElementProvider>
        <HighlightableElement 
            id="important_item_1"
            options={{
                // Options are useful if you want to configure the highlight, but can be left blank.
                mode: "rectangle",
                padding: 5,
                borderRadius: 15,
            }}
        >
            <TheRestOfTheOwl />
        </HighlightableElement>
        <HighlightableElement 
            id="important_item_2"
            options={{
                mode: "circle",
                padding: 5,
            }}
        >
            <TheRestOfTheOwl />
        </HighlightableElement>

        {/* 
          * The HighlightOverlay should be next to the ROOT of the app, 
          * since it is NOT a modal, it's just an absolutely positioned view.
          * If you want it to be a modal, wrap it in <Modal> yourself first,
          * but I recommend not using modals since they can be buggy.
          */}
        <HighlightOverlay
            // You would usually use a state variable for this :)
            highlightedElementId="important_item_1"
            onDismiss={() => {
                // Called when the user clicks outside of the highlighted element.
                // Set "highlightedElementId" to nullish to hide the overlay.
            }}
        />
    </HighlightableElementProvider>
);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
