const theme = {}

theme.COLORS = {
        PRIMARY: 'skyblue',
        SUCCESS: 'lightgreen',
        ERROR: 'red',
}

theme.FILTERS = {
        SELECTED: `drop-shadow(0px 0px 10px ${theme.COLORS.PRIMARY})`,
        WINNER: `drop-shadow(0px 0px 10px ${theme.COLORS.SUCCESS})`,
        ELIMINATE: `drop-shadow(0px 0px 10px ${theme.COLORS.ERROR})`,
        DEFAULT: `none`,

}

export default theme;