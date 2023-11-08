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
      "border": "1px solid var(--colors-primary)"
    }
  },
  {
    "visual": "outlined",
    "variant": "secondary",
    "css": {
      "border": "1px solid var(--colors-secondary)"
    }
  },
  {
    "visual": "outlined",
    "variant": "black",
    "css": {
      "border": "1px solid var(--colors-black)"
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
    "black"
  ],
  "size": [
    "sm",
    "md",
    "lg"
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