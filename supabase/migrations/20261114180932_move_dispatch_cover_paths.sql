-- Serve covers from /images/dispatch so static files never share a path with /dispatch/$slug.
update public.dispatch_articles
set cover_image = replace(cover_image, '/dispatch/', '/images/dispatch/'),
    og_image = replace(og_image, '/dispatch/', '/images/dispatch/')
where cover_image like '/dispatch/%' or og_image like '/dispatch/%';
