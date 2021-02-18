import Typography from 'typography'
import theme from 'typography-theme-ocean-beach'

theme.googleFonts = []
theme.bodyFontFamily = [
  'Helvetica Neue',
  'Arial',
  'Hiragino Kaku Gothic ProN',
  'Hiragino Sans',
  'Meiryo',
  'sans-serif',
]
theme.overrideThemeStyles = ({ rhythm }, _options) => ({
  pre: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    padding: rhythm(0.6),
    overflowX: 'auto',
  },
  'h1,h2,h3,h4,h5,h6': {
    marginTop: rhythm(1),
  },
})

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
