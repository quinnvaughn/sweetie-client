import { splitProps } from '../helpers.js';
import { createRecipe, mergeRecipes } from './create-recipe.js';

const buttonFn = /* @__PURE__ */ createRecipe('button', {
  "visual": "solid",
  "variant": "primary",
  "size": "md"
}, [
  {
    "visual": "outlined",
    "variant": "primary",
    "css": {
      "border": "1px solid var(--colors-primary)",
      "backgroundColor": "white",
      "color": "primary"
    }
  },
  {
    "visual": "outlined",
    "variant": "secondary",
    "css": {
      "border": "1px solid var(--colors-secondary)",
      "backgroundColor": "white",
      "color": "secondary"
    }
  },
  {
    "visual": "outlined",
    "variant": "black",
    "css": {
      "border": "1px solid var(--colors-black)",
      "backgroundColor": "white",
      "color": "black"
    }
  },
  {
    "visual": "outlined",
    "variant": "tertiary",
    "css": {
      "border": "1px solid var(--colors-tertiary)",
      "backgroundColor": "white",
      "color": "tertiary"
    }
  }
])

const buttonVariantMap = {
  "visual": [
    "solid",
    "outlined"
  ],
  "variant": [
    "primary",
    "secondary",
    "tertiary",
    "black"
  ],
  "size": [
    "sm",
    "md",
    "lg",
    "xl"
  ]
}

const buttonVariantKeys = Object.keys(buttonVariantMap)

export const button = /* @__PURE__ */ Object.assign(buttonFn, {
  __recipe__: true,
  __name__: 'button',
  raw: (props) => props,
  variantKeys: buttonVariantKeys,
  variantMap: buttonVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, buttonVariantKeys)
  },
})