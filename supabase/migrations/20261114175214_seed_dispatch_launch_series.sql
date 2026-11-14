-- Dispatch launch series: five articles by Michael C., backdated so Dispatch launches populated.
insert into public.dispatch_articles (slug, title, dek, body_md, category, tags, author_name, cover_image, og_image, reading_minutes, meta_description, featured, status, published_at) values
('a-new-gravitas', 'A New Gravitas', 'Introducing Gravitas.WTF, a new identity, and a clearer answer to the question we get asked most: what exactly do you build?', $md$For a while now, the honest answer to "what does Gravitas do?" has needed a paragraph. We build websites and applications for clients. We automate workflows. We run our own products. We design brand assets, write content and set up marketing systems. Each of those things is true. Put together, they sounded like a company that hadn't decided what it was.

Today we're fixing that. Gravitas is now **Gravitas.WTF**, and we're describing ourselves the way we actually operate: **an AI-first venture studio.**

## What actually changed

The legal entity hasn't changed. Gravitas Industries (Pty) Ltd is still the company, registered in South Africa (2024/596436/07) and founded by me, Michael E. Chigbu. The people, the products and the client work are the same.

What's changed is how we present the work, and how the platform behind it is organised.

**A new home.** gravitas.wtf is our primary domain. It hosts the Studio (our commercial services), the Portfolio (the ventures we own and the client systems we've built), Dispatch (this publication), and the foundations for Community and Origin, both launching in January 2027.

**A new identity.** The brand is deliberately pared back: monochrome, editorial, high contrast. Most of what we build is software, and software looks better when the interface gets out of the way. We wanted the brand to work the same way.

**A clearer structure.** Every piece of work now sits in one of two places. Either it's a **venture**, a product we own and operate, or it's **client work**, a system we built for someone else's business. We'll always say which is which.

## Why ".WTF"

The question comes up quickly, so here's the answer.

Our manifesto is *Building things that probably shouldn't exist. Until they do.* Nearly every product we've shipped started as an idea someone would reasonably have questioned. An AI that helps people make sense of their skin. A sports intelligence platform built for South African fans and tipsters, not imported from somewhere else. A financial intelligence tool that turns market noise into something a trader can act on.

Hearing "why would anyone build that?" is usually the first sign we're onto something. The domain owns that reaction instead of avoiding it. It's a bit irreverent on purpose. The seriousness belongs in the execution.

Underneath the manifesto is a quieter line that describes how we operate day to day: **Building what comes next. Now.** One line is the attitude and the other is the operating principle.

## What "AI-first" means here

"AI-first" has been stretched to cover almost anything, so here is what we mean by it.

We don't mean we add a chatbot to the end of a project. We mean AI is part of how we build from the start: how we research a problem, prototype a solution, write and test code, produce content, and run operations once something is live. A small team can only ship and maintain several products at once if AI does a real share of the work.

It also means being honest about limits. AI makes us faster. It doesn't make us right. Every system we ship still needs a person to make judgement calls, check the facts, and own the outcome. That principle applies to Dispatch too: articles here are written and approved by people, and when we start using automation in the newsroom we'll say so clearly.

## What you'll find on the new platform

**The Studio** is the commercial arm. If you run a business and need a website, an application, an internal dashboard, an automated marketing system or an AI assistant, the Studio pages explain what we do, how a project runs, and how to start one or book a consultation, all without leaving the site.

**The Portfolio** shows the work itself. Our ventures, SkinLabs®, Puntr and Klymb, sit next to client projects including Jobbyist, LOUDMOUF™ and Cannaplug. Each one is getting its own page explaining the problem, what was built, and what Gravitas contributed. For client work we're careful to separate our contribution from the client's ownership of their product.

**Dispatch** is where we write things down. It covers AI, product development, venture building and the practical side of running a technology company from South Africa. It's also home to *Building Gravitas*, our podcast.

**Community and Origin** are coming in January 2027. Community will be a place for builders, clients and collaborators to meet. Origin is our AI coding assistant. We'll share more as each gets closer, and we won't call either one available until it actually is.

## Why now

We could have kept the old setup and let the work speak for itself. But the work has grown past the way we were describing it. We're running several products at different stages, taking on client systems that matter to the businesses using them, and starting conversations with partners and funding programmes. All of those audiences need the same thing from us: a clear account of who we are, what we've built and what we're building next.

This rebrand is that account. It isn't a pivot. It's a description that finally matches the company.

## What happens next

Over the next two weeks, Dispatch will publish four more pieces explaining the thinking behind the new Gravitas:

- **Building Things That Probably Shouldn't Exist**: the philosophy behind how we pick what to build.
- **Beyond the Agency Model**: why we combine client services with in-house ventures, and why we think that combination is a strength.
- **Inside the Studio**: a tour of our services, how we work, and the projects that show it.
- **What Comes Next**: Dispatch, Origin, Community and where the Gravitas ecosystem is heading.

If you've worked with us before, thank you. Nearly everything in this rebrand came from lessons learned on your projects. If you're new, welcome. Have a look around, and if something here is close to a problem you're trying to solve, [start a conversation](/studio).$md$, 'Announcements', array['Gravitas','brand','venture studio','AI']::text[], 'Michael C.', '/images/dispatch/a-new-gravitas-hero.webp', '/images/dispatch/a-new-gravitas-og.jpg', 6, 'Gravitas Industries becomes Gravitas.WTF, an AI-first venture studio. Here''s what changed, why the name, and what we''re building.', true, 'published', '2026-10-29T08:00:00+02:00'),
('building-things-that-probably-shouldnt-exist', 'Building Things That Probably Shouldn''t Exist', 'The thinking behind an unconventional venture studio, and why a reasonable objection is often the most useful signal an idea can get.', $md$Our manifesto says *Building things that probably shouldn't exist. Until they do.* It's easy to read as attitude. It's really a description of how we decide what to work on, and of the discipline needed to make that approach more than a slogan.

## The objection is the signal

Most ideas worth building get an obvious objection early on.

*Why would South Africans need a sports intelligence platform when global apps already exist?* Because the global apps aren't built around the leagues, habits and communities that local fans actually care about.

*Why build a skincare platform when the shelves are full of products?* Because the problem was never a shortage of products. It's that people struggle to understand their own skin and which routine suits it.

*Why would a trader trust an AI tool to read the markets?* They shouldn't trust it blindly. But a tool that helps them interpret large amounts of market information more quickly, while leaving the decision to them, has real value.

Each objection is reasonable, and each one points to a gap. When the response to an idea is "surely that already exists," the honest answer is often "not in this form, not for these people, and not here." That's where we look.

## Why "probably"

The most important word in the manifesto is *probably*.

We aren't saying every strange idea deserves to be built. Most don't. "Probably shouldn't exist" means the idea looks unreasonable from the outside, the case for it isn't obvious yet, and it won't survive unless someone does the work of proving it.

So the manifesto is a commitment to testing ideas, not a licence to build anything. The second half, *until they do*, matters just as much. An idea is only vindicated when there's a working product people are using. Until then it's a hypothesis.

## How we decide what to build

We don't run a formal scoring model, and inventing one for a blog post wouldn't be honest. But we do ask the same few questions every time.

**Is there a specific group of people with a specific problem?** "Everyone who has skin" is not a market. "People who want a routine that matches their skin and can't get clear guidance" is closer. The narrower the starting group, the faster we learn whether we're right.

**Is there a local angle that global products miss?** Building from South Africa is an advantage when we use it well. We understand the payment systems, the languages, the sports, the consumer habits and the infrastructure limits from experience, not research. Many of our best ideas come from noticing where an imported product doesn't fit.

**Can AI do real work here, not just decorative work?** We look for problems where AI changes what's possible: analysing a photo, digesting a flood of market or sports data, running a workflow nobody has time to run by hand. If AI only adds novelty, the idea usually isn't strong enough.

**Can we ship a useful first version quickly?** Long, quiet build cycles are where unreasonable ideas die. We want something real in people's hands early, even if it's narrow.

**Would we use it ourselves?** Not a strict rule, but a useful check. Products we'd want to use get better attention from us.

## What this looks like in practice

The clearest way to explain the philosophy is to point at what it has produced.

**SkinLabs®** started in September 2023 as an attempt to make skincare make sense. It has since become a content-first skincare platform built around SKYNN AI, which offers AI-assisted skin analysis, smart routines and an educational layer meant to help people understand the reasoning behind a recommendation.

**Puntr** is a sports intelligence and community platform for South African sports fans, punters and tipsters. It's launching with football first and will add more sports in phases, because getting one sport right matters more than covering ten badly.

**Klymb** is an AI-powered financial intelligence platform. It helps traders interpret market information and spot opportunities across markets, as a support for the trader's own judgement rather than a substitute for it.

None of these was the obvious thing to build, and each is still being proven. That's the point: the manifesto describes ongoing work, not a victory lap.

## The discipline behind the ambition

An unconventional studio needs conventional discipline, or it becomes a collection of half-finished experiments.

**Honesty about stage.** Every product in our portfolio is labelled with where it actually is: live, in beta, coming soon. We don't round up. Investors, partners and users can tell the difference between ambition and spin.

**No invented proof.** We won't publish user numbers we can't back up, testimonials that weren't given, or outcomes that didn't happen. If a claim on gravitas.wtf can't be verified, it doesn't go on the site.

**Shared foundations.** Running several products is only possible because they share infrastructure: authentication, payments, content systems, automation and deployment patterns we've refined across projects. Each new venture starts from a stronger base than the last.

**Willingness to stop.** Some ideas don't survive contact with reality. Part of the philosophy is recognising that early and moving the effort somewhere more useful.

## Why this matters to clients

You might wonder what any of this has to do with hiring Gravitas to build a website or automate a workflow.

The same habits apply. When a client brings us a problem, we start by questioning the obvious solution. Sometimes the right answer is a full platform. Sometimes it's a simple automation that removes ten hours of manual work a week. The studio that builds ambitious ventures is the same one that will tell you when you need something smaller.

And every system we build for a client benefits from what we've learned running our own products: what breaks in production, what users actually do, and what it takes to keep something working long after launch.

## Until they do

Things that probably shouldn't exist stop being strange once they work. Then they just look like products, and people forget anyone doubted them.

That's the goal every time: to make the unlikely idea ordinary. We'll write about the attempts here, including the ones that don't work out.$md$, 'Venture Building', array['philosophy','product strategy','AI','South Africa']::text[], 'Michael C.', '/images/dispatch/building-things-that-probably-shouldnt-exist-hero.webp', '/images/dispatch/building-things-that-probably-shouldnt-exist-og.jpg', 7, 'Why Gravitas builds products that sound unreasonable at first, and the discipline that keeps that ambition honest.', false, 'published', '2026-11-02T08:00:00+02:00'),
('beyond-the-agency-model', 'Beyond the Agency Model', 'Why Gravitas runs client services and in-house ventures under one roof, and why we think that combination makes both sides better.', $md$There's a common assumption in our industry that you have to pick a side. You're either an agency that builds for clients or a startup that builds for yourself. Agencies are told they'll never build anything of their own. Startups are told client work is a distraction.

Gravitas does both, deliberately. This piece explains why, how the two sides support each other, and where the trade-offs are.

## Where the agency model falls short

The traditional agency model works. It pays salaries and produces good work. But it has structural limits.

**Revenue is tied to hours.** An agency only earns while it's billing, so growth means more people, more projects and more hours. There's little room to build anything that compounds.

**The learning leaves with the project.** An agency builds a platform, hands it over, and moves on. Whatever happens next (which features get used, what breaks at scale, how users actually behave) mostly happens out of view. The client gets the long-term lessons, and the agency starts the next project from roughly the same place.

**The incentives point at delivery, not outcomes.** Not because anyone is acting in bad faith, but because the contract usually ends at launch. Launch is where the real work begins.

## Where the pure startup model falls short

The single-product startup has the opposite problem.

**One bet carries everything.** If the product takes longer than expected to find traction, which happens to most products, the company's survival depends on runway, funding or the founder's savings.

**Narrow exposure.** A team working on one product in one market sees a small slice of the problems businesses actually have, which makes it harder to recognise the next opportunity.

**A slower route to revenue.** Many products take a long time to earn meaningful income. That can be fine with outside capital. Without it, it's a real constraint.

## Running both

Gravitas runs both models together so that each covers the other's weak spots.

**Client work funds and grounds the ventures.** Studio engagements bring in revenue now, including ongoing monthly service and maintenance arrangements that give the business a recurring base. That income lets us develop our own products without betting everything on any single one. It also keeps us in direct contact with real businesses and their real problems, which is where many venture ideas come from.

**The ventures sharpen the client work.** Running our own products means we live with what we build. We handle the support requests, see the analytics, deal with outages, and make the trade-offs between new features and stability. That experience goes straight back into client projects. When we recommend an architecture, a payment flow or an automation approach, it's usually because we've run it ourselves.

**Shared infrastructure benefits everyone.** Over time we've built up common foundations: authentication and user management, payments, content and newsletter automation, admin dashboards, deployment pipelines. A client project gets the benefit of patterns already tested on our own products, and a new venture starts with tools refined on client work.

## What this looks like in the portfolio

Our portfolio is split in two, and we keep the labels clear.

The **ventures** are products Gravitas owns and operates: **SkinLabs®**, **Puntr** and **Klymb**. We make the product decisions and carry the risk.

The **client projects** are systems we built for other businesses. **Jobbyist** is a recruitment and job-discovery platform. **LOUDMOUF™** is a consumer brand and digital experience. **Cannaplug** involved digital commerce infrastructure: product discovery, customer accounts, administration, in-store point-of-sale and payments. In each case the client owns the brand and the business, and we're specific about what Gravitas built.

The two sides cross over all the time. The newsletter automation system we developed now delivers member newsletters for more than one business, including our own. Payment and point-of-sale work for a client informs how we approach commerce in our products. Content workflows built for SkinLabs show up in proposals for clients who need consistent publishing.

## The trade-offs

This model isn't free, and pretending otherwise would be dishonest.

**Focus is the main cost.** Every hour on a client project is an hour not spent on a venture, and the reverse. We manage this with clear priorities and by keeping client engagements scoped and well defined. It still takes constant attention.

**Clients deserve to know where they stand.** A reasonable question from any client is whether their project gets less attention because we have our own products. Our answer is in how we structure engagements: defined scope, milestones, regular updates, and, with the client portal we're rolling out, a direct view of progress, deliverables and invoices. Client commitments come first because the business depends on them.

**Conflicts of interest need care.** If a client's business overlaps with one of our ventures, we raise it at the start. Trust matters more than any single engagement.

## Why it matters to the people we work with

**For clients**, you're hiring a team that has shipped and operated products end to end, not one that hands over a codebase and leaves. We think about what happens after launch because we deal with it every day.

**For partners and funding programmes**, Gravitas isn't a pitch deck waiting for capital. It's an operating company with revenue-generating services, deployed products and its own infrastructure. Outside support speeds up what's already happening. It doesn't start it.

**For the ventures**, client revenue buys patience: time to get the product right instead of rushing it to market to survive.

## The bigger idea

A venture studio is usually defined by the companies it starts. We'd add something: a studio is defined by what it learns and reuses. Each client system and each venture adds to the foundations under the next project.

That's what we mean by building an ecosystem rather than a series of projects. It's slower to explain than "we're an agency" or "we're a startup," but it describes what Gravitas actually is.$md$, 'Entrepreneurship', array['business model','venture studio','agency','client services']::text[], 'Michael C.', '/images/dispatch/beyond-the-agency-model-hero.webp', '/images/dispatch/beyond-the-agency-model-og.jpg', 7, 'Agency or venture studio? Gravitas is both on purpose. Here''s how client work and our own products strengthen each other.', false, 'published', '2026-11-05T08:00:00+02:00'),
('inside-the-studio', 'Inside the Studio', 'A tour of what Gravitas Studio builds, how a project actually runs, and the work that shows it.', $md$Our tagline for the Studio is *Big ideas. Unreasonable execution.* This piece is about the execution: what we build for clients, how we work, and where you can see the results.

Gravitas Studio is the commercial services side of the company. In one sentence: **we design, develop and deploy intelligent digital systems that help businesses operate smarter, communicate better and build what comes next.**

## What we build

Our services fall into a handful of areas, all listed on [gravitas.wtf/studio](/studio). Here's the short version.

### Workflow management and automation

Most businesses run on processes nobody designed: spreadsheets, forwarded emails, manual approvals and knowledge that lives in one person's head. We build systems that replace the repetitive parts, including internal workflow tools, approval processes, document handling, CRM and API integrations, and automated reporting. The aim is simple: fewer hours spent moving information around, and more spent on work that matters.

### Website and application design and development

From a marketing site to a full SaaS platform: websites, web applications, progressive web apps that behave like native apps on a phone, MVPs and product prototypes. We handle UX and UI design, front end and back end, and deployment. Mobile comes first, because for most South African customers the phone is the main way they reach a business.

### Custom digital dashboards

Internal dashboards, customer-facing portals, admin panels and reporting views that turn scattered data into something a team can act on. A good dashboard answers the question you'd otherwise spend twenty minutes digging for.

### Automated multi-channel marketing

Email, SMS and WhatsApp systems that run without someone pressing send each time: lifecycle messages, lead nurturing, segmentation, scheduled campaigns and transactional notifications connected to your customer data. We built and operate a newsletter automation system that delivers optimised member newsletters for several businesses, so this is something we run every day, not just a service we list.

### AI voice receptionists and sales assistants

Website chatbots, WhatsApp assistants and AI receptionists that can answer questions, qualify leads and book appointments, grounded in your own business information so they don't make things up. They're designed to hand over to a human when a conversation needs one.

### Editorial-grade content and marketing

AI-assisted editorial workflows, SEO content, social content, newsletters and podcast production pipelines. We also run these for our own ventures, which is how we know what consistent publishing actually takes.

### Visuals, graphics and marketing assets

Brand identities, campaign visuals, social and paid-ad creative, product mockups and presentation design. We produce paid-ad creative for our own ventures' social channels, and the same approach applies to client work.

## How a project runs

The way we work matters as much as what we build. Most projects follow the same shape.

**1. Conversation first.** Every engagement starts with a consultation. Before anything else we want to understand the business, the problem and what success would look like. Sometimes that conversation shows the client needs something smaller than they expected. When it does, we say so.

**2. Scope and proposal.** We write down what we'll build, what we won't, how long it should take and what it costs. Clear scope protects both sides.

**3. Build in visible increments.** We work in milestones, and clients see progress throughout instead of waiting for a big reveal. The Gravitas client portal we're rolling out brings project progress, milestones, deliverables and invoices into one place.

**4. Launch properly.** Going live includes testing, performance checks, analytics, and making sure the people running the system know how to use it. For admin-heavy systems we walk the team through the tools.

**5. Stay involved.** Most of our clients stay with us on monthly service and maintenance arrangements: hosting, updates, fixes, small improvements and support. Software that nobody maintains slowly breaks, and we'd rather keep it healthy than rebuild it later.

## The work behind the claims

Anyone can write a list of services. What matters is the work behind it. Our [Portfolio](/portfolio) shows each project in more detail. A few relevant examples:

**Cannaplug (client).** A digital platform covering product discovery, customer accounts, administration, an in-store point-of-sale system with printable and emailable receipts, and online payments. This project used several Studio services together: web development, dashboards, workflow and payments integration.

**Jobbyist (client).** A recruitment and job-discovery platform focused on making employment opportunities easier to find, with search, indexing and SEO-driven distribution.

**LOUDMOUF™ (client).** A consumer brand and digital experience, where our creative and technical work came together.

**SkinLabs®, Puntr and Klymb (our ventures).** These products show our in-house capability: AI-assisted analysis in SkinLabs' SKYNN AI, sports intelligence and community features in Puntr, and financial intelligence in Klymb. When we recommend an approach to a client, it has usually been tested on one of these first.

For client projects, the client owns the brand and the business. Our project pages say specifically what Gravitas built.

## What we won't do

Being clear about this saves everyone time.

- **We won't invent results.** You won't find made-up statistics or testimonials on our site, and we won't promise outcomes we can't control.
- **We won't oversell AI.** If a simple automation solves your problem, we won't sell you an AI system.
- **We won't hold your system hostage.** You'll understand what's been built and how it runs.

## Who the Studio is for

Our clients range from small local businesses that need a reliable online presence and some automation, to companies that need a full platform built. What they share is a problem worth solving properly and a preference for a partner who stays involved after launch.

If that sounds like you, there are two ways in:

- **[Start a Project](/contact)**: tell us what you're trying to build, your timeline and your budget range.
- **[Book a Consultation](/contact)**: pick a time and we'll talk it through.

Either way, you'll be talking to the people who'll actually build it.$md$, 'Studio', array['services','automation','web development','AI assistants','portfolio']::text[], 'Michael C.', '/images/dispatch/inside-the-studio-hero.webp', '/images/dispatch/inside-the-studio-og.jpg', 8, 'What Gravitas Studio builds (websites, apps, dashboards, automation, AI assistants and content systems) and how a project works from first call to launch.', false, 'published', '2026-11-09T08:00:00+02:00'),
('what-comes-next', 'What Comes Next', 'Dispatch, Origin, Community and Season 2 of Building Gravitas: where the ecosystem goes from here, and the rules we''re setting for ourselves along the way.', $md$Over the past two weeks we've explained the new Gravitas: the identity, the philosophy, the business model and the Studio. This last piece in the launch series looks ahead.

The line under our manifesto is *Building what comes next. Now.* Here is what's next, as concretely as we can describe it today.

## Dispatch: from publication to newsroom

You're reading Dispatch now. We call it *the signal from inside Gravitas*: a publication about AI, emerging technology, entrepreneurship, product development and building ventures, written from an operating studio rather than from a distance.

For now, every Dispatch article is written and approved by people. These five launch pieces were drafted, reviewed and published under editorial control.

Over time we plan to turn Dispatch into an **AI-assisted newsroom**. The idea is a pipeline that monitors relevant developments, finds and pulls source material from the web, checks the quality of those sources, drafts editorial briefs and articles, and runs quality and duplicate checks before anything reaches an editor.

We're designing the technology to be modular. We intend to use **Parallel** for live web research and source discovery, **Firecrawl** where deeper crawling and extraction add value, and **Google Gemini** for synthesis and drafting. The system is built so any of these can be swapped without rewriting the newsroom.

To be clear about where this stands: the automated newsroom is in development, not live. When it does go live, these rules apply:

- **No invented facts, quotes, statistics or sources.** Every claim must be traceable to a real source, and sources are cited.
- **Unsupported claims don't get published.** If something can't be checked, it doesn't run.
- **People stay in control.** A manual approval mode, configurable schedules and an emergency pause are part of the design from the start.
- **Automation will be disclosed.** Readers will know how a piece was produced.

The goal isn't more content. The internet has plenty. The goal is to cover more ground well, at a pace a small team couldn't manage alone.

## Building Gravitas: Season 2

*Building Gravitas* is our podcast about the process of building the company: developing products, experimenting with AI, and the realities of running ventures.

The existing episodes are being brought together as **Season 1 [Pilot]** in a podcast section of Dispatch, with show notes and a proper player.

**Season 2 launches in January 2027.** We'll announce episodes and dates when they're confirmed. Expect the same approach as Season 1, with more of the build process shown in the open.

## Origin: an AI coding assistant from Gravitas

**Origin** is the most ambitious thing on our roadmap: an AI coding assistant built by Gravitas, **coming January 2027.**

The idea comes directly from how we work. Shipping and maintaining several products and client systems with a small team means AI-assisted development is already central to our process. Origin is our attempt to package what we've learned into a tool other builders can use.

Origin isn't available yet, and we won't describe features before they're ready to show. The foundations are being laid on the platform now, and Origin has a place in the navigation. When there's something real to try, Dispatch is where we'll announce it.

## Community: a place for builders

**Community**, also **launching January 2027**, is the part of the ecosystem we've been asked about most.

Throughout our work we've met founders, freelancers, small business owners and developers working on many of the same problems: how to use AI properly, how to ship with a small team, how to build products for the South African market and beyond. Community is meant to bring those people together, along with our clients and collaborators, to share what's working and help each other.

We'll publish more on its shape, how to join and what it will offer as January approaches.

## The ventures keep moving

The ecosystem is more than the new platform pieces. Our ventures keep developing:

- **SkinLabs®** continues to develop SKYNN AI and its skincare education platform.
- **Puntr** is launching its sports intelligence and community platform, starting with football and adding more sports in phases.
- **Klymb** continues developing its AI-powered financial intelligence tools for traders.

And **Monogamy**, a lifestyle technology product, appears in our portfolio as Coming Soon. We'll introduce it properly when it's ready.

## Partnerships and funding

As Gravitas grows, we're also opening the door to partnerships. That includes technology partners, accelerators, startup programmes and strategic collaborators who can help us move faster. Our [partnerships page](/partners) is the place to start that conversation.

We'll approach these conversations the same way we approach everything else: clear about what we've built, honest about the stage each product is at, and specific about what support would speed up.

## Rules for the road

All of this is ambitious, and ambition without rules turns into hype. So these are the commitments we're making publicly, now:

1. **We'll only call something available when it is.** "Coming January 2027" means exactly that.
2. **We won't publish numbers we can't back up.** No inflated users, no invented outcomes.
3. **We'll say when AI is involved,** and keep people accountable for anything published under our name.
4. **We'll keep client work and ventures clearly labelled.**
5. **We'll report what goes wrong as well as what works.**

## See you in January

For now, the best way to follow along is here on Dispatch, on our [Substack](https://gravitasindustries.substack.com) and on [Medium](https://gravitas.medium.com). If you want to talk about a project, a partnership or anything in this series, you can reach us on [WhatsApp](https://wa.me/+27680200749) or through the [Studio](/studio).

Thank you for reading the launch series.$md$, 'Gravitas Ecosystem', array['Dispatch','Origin','Community','podcast','roadmap']::text[], 'Michael C.', '/images/dispatch/what-comes-next-hero.webp', '/images/dispatch/what-comes-next-og.jpg', 7, 'What''s next for Gravitas: an AI-assisted newsroom, the Origin coding assistant, a builder community and Season 2 of Building Gravitas, all from January 2027.', false, 'published', '2026-11-12T08:00:00+02:00')
on conflict (slug) do nothing;
