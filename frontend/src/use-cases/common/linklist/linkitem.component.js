import LinkIcon from "@material-ui/icons/Link";
import DeleteIcon from "@material-ui/icons/Delete";

const LinkItem = (link, onDelete) => {
    return {
        id: link.shortcut,
        icon: LinkIcon,
        text: link.shortcut + (link.creatorUID ? " ❘ " + link.creatorUID : ""),
        secondaryText: link.linkurl,
        actionIcon: DeleteIcon,
        actionOnClick: item => onDelete(item.id),
    };
};

export default LinkItem;
