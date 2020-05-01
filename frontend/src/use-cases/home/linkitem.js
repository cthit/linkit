import LinkIcon from "@material-ui/icons/Link";

const LinkItem = link => {
    return {
        icon: LinkIcon,
        text: link.shortcut,
        secondaryText: link.linkurl,
    };
};

export default LinkItem;
