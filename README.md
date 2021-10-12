# Highlight overlay

A tinted overlay that allows one or more elements to be highlighted (non-tinted). 
Works with all types of components; native, function, class, etc.

Supports switching between highlights, useful for a "tutorial" / "walkththrough" flow
where you step the user through different parts of a screen. Also very useful for
highlighting an element when the user enters the app from a deep link.

<p align="center">
  <img src="https://user-images.githubusercontent.com/16232214/136886173-7cc62e23-9a93-4449-9055-dba580bb6e64.gif" height="500" />
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

## Installation

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
        <HighlightableElement id="important_item">
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
            highlightedElementId="important_item"
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
