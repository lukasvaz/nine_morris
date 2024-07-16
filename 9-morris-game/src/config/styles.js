const theme={}

theme.COLORS= {    
        PRIMARY: 'skyblue',
        ERROR: 'red',
}

theme.FILTERS={
        SELECTED: `drop-shadow(0px 0px 10px ${theme.COLORS.PRIMARY})`,
        AVAILABLE: `drop-shadow(0px 0px 10px ${theme.COLORS.PRIMARY})`,
        DEFAULT: `none`,
    
}

export default theme;