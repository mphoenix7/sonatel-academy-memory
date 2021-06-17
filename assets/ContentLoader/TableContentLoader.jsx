import React from "react"
import ContentLoader from "react-content-loader"



const TableContentLoader = (props) => (

    <ContentLoader
        speed={2}
        width={800}
        height={350}
        viewBox="0 0 800 350"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="4" y="1" rx="6" ry="6" width="2200" height="46" />
        <rect x="5" y="58" rx="6" ry="6" width="2200" height="46" />
        <rect x="5" y="117" rx="6" ry="6" width="2200" height="46" />
        <rect x="3" y="174" rx="6" ry="6" width="2200" height="46" />
        <rect x="3" y="237" rx="6" ry="6" width="2200" height="46" />
        <rect x="4" y="295" rx="6" ry="6" width="2200" height="46" />
    </ContentLoader>
)

export default TableContentLoader