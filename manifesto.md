# Airbus for AI

Airbus for AI is a blueprint for a new frontier AI lab designed to compete directly with OpenAI. This site organizes arguments and efforts to create such an Airbus for AI.

## Executive Summary

Artificial intelligence is becoming critical infrastructure. But the frontier of AI is controlled by a handful of firms located almost entirely in the U.S. and China.

The middle powers—Canada, Germany, Japan, Spain, Sweden, Switzerland, the U.K.—have invested heavily in labs and compute. But few have built AI products that can compete globally.


Artificial intelligence (AI) is becoming central to economic productivity and national sovereignty, but its current frontier development is concentrated in a few dominant U.S. and Chinese firms. Many middle power countries like Canada, Germany, Japan, Spain, Sweden, Switzerland, and the U.K. have struggled to field competitive AI products despite substantial public and private investment across national labs and national champions (Allen, 2025; Council of the European Union, 2023; Escritt, 2023; Kreps, 2024; Scott, 2024; Stage et al., 2024; Stanford HAI, 2024). Insufficient funding, a talent/compensation gap, regulatory constraints, and fragmented markets all hinder their ability to scale AI initiatives effectively. As a result, directors in several national AI labs have called for more coordinated public interventions (Bengio, 2023; Valero & Crespo, 2024) while policymakers are debating the case for industrial policy interventions to support domestic AI firms (AI Now Institute, 2024; European Commission, 2025b; UK Government, 2025).

<Footnote topOffset={0} data={<span>See <a href="https://web.archive.org/web/20220704170213/https://www.newsdemon.com/charter-directory">https://web.archive.org/web/20220704170213/https://www.newsdemon.com/charter-directory</a></span>}></Footnote>

If AI is to serve the economic and security interests of all countries, it must be developed in a way that balances public value generation with a credible business model and a pathway to scale in global markets. Any solution must also respond to emerging industrial trends in AI, including the increasing commodification of large language models (LLMs), the rise of open source, and the dramatically increasing salience of national security and geopolitics to trade in AI.

There are precedents for such solutions. In particular, Airbus, originally developed by a set of middle powers to compete in aerospace, provides a successful example of an international public-private collaboration. This policy brief proposes a **Public AI Company** inspired by such models—a coordinated public-private partnership that ensures AI development serves shared national interests and maximizes public value rather than concentrating benefits in a handful of private entities headquartered in global superpowers. Drawing on decades of economic and public policy research as well as a technical analysis of current AI supply chains, this brief outlines why such a global approach is both necessary and achievable, and discusses some of the risks and challenges involved.

## The Middle Powers' Dilemma

Middle power countries face structural barriers that prevent them from building globally competitive frontier AI systems.

**_Scale_** At every stage of the supply chain—data, compute, model training, deployment, and talent—scale dynamics favor the largest, most vertically-integrated players. These monopoly pressures have stratified the market into a top tier of U.S. and Chinese hyperscalers (such as OpenAI, Google, Microsoft, Alibaba, Anthropic, DeepSeek) and a fragmented landscape of dependent smaller firms. By way of example: ChatGPT has approximately 79.8% of the global consumer chatbot market as of July 2025. Perhaps the best-known “sovereign” competitor, Mistral’s Le Chat, has less than 4% market penetration **in France**, its home market (Statcounter, 2025).

**_Limited Markets_** States’ default approach has been to support the growth of local private firms (Department of Finance, Canada, 2024; European Commission, 2024; Ministry of Economy, Trade and Industry, Japan, 2024; UK Department for Science, Innovation and Technology, 2023). But even such national champions with overt state support struggle to access risk capital or penetrate markets outside their home market—consider Mistral’s performance in France compared toGermany (Dillet, 2025). There is currently insufficient economic incentive for new private sector entrants—companies like Sakana, Lighton, and Cohere—to develop competitive frontier models, especially the large pre-trained models that ground the modern AI stack (Azoulay et al., 2024).

**_Foreign Capture_** Public subsidies to private champions risk later rent extraction or foreign expropriation by acquisition—consider for example AMD’s acquisition of Finland’s Silo, which had been supported by Finnish/EU supercomputing resources (Cherney, 2024; LUMI, 2024).

**_Fragmented Sovereigns_** Apart from supporting domestic firms, several middle powers have adopted public AI strategies anchored by large public compute investments and domestic production of large language models within national labs (European Commission, 2024; Innovation, Science and Economic Development Canada, 2024; Sastry et al., 2024; Takano et al., 2024). Such investments can produce interesting research outputs, but public AI investments of $30M for a new public model or $500M for a new public data center do not meaningfully compete with the dominance of the leading U.S. and Chinese frontier labs. Fragmentation of these national initiatives also results in duplicated efforts and contributes to scale problems, preventing coordinated advances in AI.

**_Research, Not Development_** States often fund national labs to build frontier models, such as Sweden’s GPT-SW3, Singapore’s SEA-LION, Spain’s Salamandra, or the EU’s many pan-European research consortia (Ekgren et al., 2024; European Commission, 2025a; Gonzalez-Agirre et al., 2025; Ng et al., 2025). Yet these labs, endowed with some of the world’s most powerful supercomputers, struggle with bureaucratic constraints, no access to risk capital, a lack of skills for product development and subsequent commercialisation, high sensitivity to legal risk (e.g. on copyright), and the challenge of competing with private firms with more focus and greater agility. The result is a fragmented landscape of publicly-funded models that are not actually being used.

| How does your country access frontier AI?                                       | Is it competitive with frontier labs and models?                                     | Does it generate public value?                      | Does it protect national sovereignty?                 |
|----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|-----------------------------------------------------|-------------------------------------------------------|
| **Import private models** (e.g. OpenAI, Anthropic)                               | ✅                                                                                     | ❌ Most value is captured privately.                | ❌                                                     |
| **Import open models** (e.g. Meta, DeepSeek)                                     | ⚠️ Cheap, but not best-in-class.                                                      | ✅                                                 | ⚠️ Production still lives abroad.                      |
| **Back national champions and local startups** (e.g. Mistral)                    | ⚠️ Not in consumer or pretraining, but some traction in enterprise.                  | ⚠️ Spillovers, but no public accountability.        | ⚠️ Threat of foreign acquisition (e.g. DeepMind, Silo). |
| **Fund national AI labs** (e.g. Swiss AI)                                        | ❌ Note: a bit of traction in public sector use.                                      | ✅                                                 | ✅                                                     |
| **Fund research consortia** (e.g. OpenEuroLLM, CERN for AI proposals)           | ❌ Wrong incentives for product. Limited access to capital.                           | ✅                                                 | ✅                                                     |

## The Airbus Model

The Airbus story began in the late 1960s as European governments recognized that their domestic aerospace industries were struggling to compete with dominant American firms Boeing and McDonnell Douglas. The fragmented nature of European aviation, with multiple national firms developing independent aircraft models, led to inefficiencies and an inability to achieve the economies of scale necessary for global competitiveness. In response, France, Germany, and later the U.K. and Spain collaborated to create Airbus, a consortium that pooled resources, expertise, and funding to develop a competitive alternative to American aviation giants.

**Government support** played a crucial role in Airbus' success. European states provided financial backing and advanced market commitments, ensuring that Airbus had the stability to undertake complex aircraft development projects. This public-private partnership allowed Airbus to invest in cutting-edge research, standardized manufacturing, and coordinated supply chains that spanned multiple countries. The Airbus A300, the consortium’s first commercial aircraft, demonstrated the viability of this model by successfully entering the market against well-established and dominant American competitors.

Over time, Airbus refined its approach by embracing **supply chain specialization**. Each participating country focused on different aspects of aircraft production—France on avionics and final assembly, Germany on fuselage construction, the U.K. on wings, and Spain on tail sections. This structured division of labor contributed to efficiency while maintaining national contributions and industrial expertise. 

Of course, Airbus has faced challenges—such as the failure of the A380 (Seabright, 2011)—and the 1960s aerospace industry differs in important ways from AI today (see Appendix: The 1960s Aerospace Industry). But Airbus remains one of the most successful examples of coordinated industrial policy in the modern era, and a promising model for global AI development.

## An Airbus for AI
Inspired by Airbus, we propose that Canada, Germany, Japan, Singapore, South Korea, Spain, Sweden, Switzerland, France, the U.K., and other middle powers unify **their existing sovereign AI efforts** into a **Public AI Company**—a competitive frontier AI lab to build and commercialize AI in the public interest.

### How?
First, each participating nation needs to identify or organize at least one **_national entity_** which will participate in the Public AI Company. Each national entity should have top-level political support and frontier AI capabilities in at least one component of the AI stack. Depending on the country and its sovereign AI strategy, this entity may be an existing private national champion (e.g. France’s Mistral, Canada’s Cohere), a public national lab (e.g. Spain’s BSC, Japan’s RIKEN), an existing regional coalition (e.g. New Nordics AI), or a new public-private partnership.

Second, integrate these national entities into an **_Airbus-style enterprise_** that coordinates key shared activities:
1. model building, especially pre-training,
2. resource sharing, especially compute and expertise, and
3. market strategy, including shared branding.

Third, each national entity should handle localization for language, culture, and in-country data, deployment in local data centers for inference, and public engagement with citizens and political leadership. Depending on the local commercial and political environment, each national entity may consider adopting a **_public utility_** business model (see Appendix: AI as a Public Utility).

