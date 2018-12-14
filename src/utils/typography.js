import Typography from 'typography'
import theme from 'typography-theme-ocean-beach'

theme.googleFonts.push(
  {
    name: 'Noto+Sans+JP',
    styles: ['400'],
  }
)
theme.bodyFontFamily = ['Noto Sans JP', 'Roboto', 'serif']
theme.overrideThemeStyles = ({ rhythm }, options) => ({
  'pre': {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    padding: rhythm(0.6),
    overflowX: 'auto'
  }
})

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale

