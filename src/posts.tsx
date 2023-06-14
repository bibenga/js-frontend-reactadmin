import {
    useRecordContext, required, List, Datagrid, TextField, ReferenceField, EditButton,
    DeleteButton, Create, Edit, SimpleForm, ReferenceInput, TextInput, AutocompleteInput,
    DatagridConfigurable, SelectColumnsButton, TopToolbar, FilterButton, CreateButton,
    ExportButton, ResetViewsButton, BulkDeleteButton, Show, SimpleShowLayout,
    DateField, RichTextField,
} from "react-admin";

const PostTitle = () => {
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

const postFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
];

const PostListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <FilterButton />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

const PostBulkActionButtons = () => (
    <>
        {/* <ResetViewsButton label="Reset Views" /> */}
        {/* default bulk delete action */}
        <BulkDeleteButton mutationMode="pessimistic" />
    </>
);

export const PostList = () => (
    <List filters={postFilters} actions={<PostListActions />} bulkActionButtons={<PostBulkActionButtons />}>
        <DatagridConfigurable rowClick="edit">
            <TextField source="id" />
            <ReferenceField source="userId" reference="users" />
            <TextField source="title" />
            {/* <TextField source="body" /> */}
            {/* <EditButton /> */}
            {/* <DeleteButton mutationMode="pessimistic"/> */}
        </DatagridConfigurable>
    </List>
);

export const PostEdit = () => (
    <Edit title={<PostTitle />}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users" fullWidth validate={required()}>
                <AutocompleteInput fullWidth validate={required()} />
            </ReferenceInput>
            {/* <TextInput source="id" /> */}
            <TextInput source="title" fullWidth validate={required()} />
            <TextInput source="body" fullWidth multiline rows={5} />
        </SimpleForm>
    </Edit>
);

export const PostCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <AutocompleteInput fullWidth validate={required()} />
            </ReferenceInput>
            <TextInput source="title" fullWidth validate={required()} />
            <TextInput source="body" fullWidth multiline rows={5} />
            {/* <RichTextInput source="body" /> */}
        </SimpleForm>
    </Create>
);

export const PostShow = () => (
    <Show>
        <SimpleShowLayout>
            <ReferenceField source="userId" reference="users" />
            <TextField source="title" />
            <RichTextField source="body" />
            {/* <DateField label="Publication date" source="published_at" /> */}
        </SimpleShowLayout>
    </Show>
);
