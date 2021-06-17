import React from "react"
import ContentLoader from "react-content-loader"

const EditFormContentLoader = (props) => (
    <ContentLoader
        speed={2}
        width={1400}
        height={350}
        viewBox="0 0 1400 350"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="36" rx="4" ry="4" width="302" height="45" />
        <rect x="318" y="36" rx="4" ry="4" width="288" height="45" />
        <rect x="-2" y="94" rx="4" ry="4" width="305" height="45" />
        <rect x="-3" y="155" rx="4" ry="4" width="305" height="45" />
        <rect x="318" y="154" rx="4" ry="4" width="290" height="45" />
        <rect x="-4" y="216" rx="4" ry="4" width="305" height="45" />
        <rect x="-2" y="277" rx="4" ry="4" width="305" height="45" />
        <circle cx="335" cy="114" r="14" />
        <rect x="368" y="106" rx="0" ry="0" width="72" height="16" />
        <circle cx="467" cy="115" r="14" />
        <rect x="500" y="105" rx="0" ry="0" width="72" height="16" />
    </ContentLoader>
)

export default EditFormContentLoader