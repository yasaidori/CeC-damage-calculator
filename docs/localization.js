const localizations ={
    
    buttons:{
            jp:{
                Blade_of_Retribution:       "29 (復讐の刃)",
                Blade_of_Retribution_SP:    "54 (復讐の刃 必殺)",
                Demon_Hunter_the_Eldest:    "18 (悪魔ハンター姉)",
                Demon_Hunter_the_Eldest_SP: "38 (悪魔ハンター姉 必殺)",
                clear:                      "リセット",
                
                Scions_of_Light:            "疾く走れ、疾く集え",
                Scions_of_Light_SP:         "疾く走れ、疾く集え 必殺",
                Martial_Florist:            "武闘派植物",
                Martial_Florist_SP:         "武闘派植物 必殺",
                Anti_demon_Submachinegun:       "退魔サブマシンガン",
                Anti_demon_Submachinegun_SP:    "退魔サブマシンガン 必殺",
                The_Undying:                "輪廻天翔",
                The_Undying_SP:             "輪廻天翔 必殺",
                
                Lustrous_Heroic_King:            "光の英雄王",
                Lustrous_Heroic_King_SP:         "光の英雄王 必殺",
                Radiant_Maestro:            "陽光の老騎士 アナザー",
                Radiant_Maestro_SP:         "陽光の老騎士 アナザー 必殺",
                Absolute_Power:             "絶対的なチカラ",
                Absolute_Power_SP:          "絶対的なチカラ 必殺",
                Pale_Mist:                  "八十八式・朧叢雲改",
                Pale_Mist_SP:               "八十八式・朧叢雲改 必殺",
                Voltaic_Chains:             "ヴォルティックチェーン",
                Voltaic_Chains_SP:          "ヴォルティックチェーン 必殺",
                Bruteforce_Girl:            "15 (突撃主義)",
                Bruteforce_Girl_SP:         "30 (突撃主義 必殺)",
                Great_White_Shark_Soulbeast:"28 (ホオジロザメの妖魔獣人)",
                
                
            },
            en:{
                Blade_of_Retribution:       "29 (Blade of Retribution)",
                Blade_of_Retribution_SP:    "54 (Blade of Retribution SP)",
                Demon_Hunter_the_Eldest:    "18 (Demon Hunter the Eldest)",
                Demon_Hunter_the_Eldest_SP: "38 (Demon Hunter the Eldest SP)",
                clear:                      "Reset",
                
                Scions_of_Light:            "Scions of Light",
                Scions_of_Light_SP:         "Scions of Light SP",
                Martial_Florist:            "Martial Florist",
                Martial_Florist_SP:         "Martial Florist SP",
                Anti_demon_Submachinegun:       "Anti-demon Submachinegun",
                Anti_demon_Submachinegun_SP:    "Anti-demon Submachinegun SP",
                The_Undying:                "The Undying",
                The_Undying_SP:             "The Undying SP",
                
                Lustrous_Heroic_King:       "Lustrous Heroic King",
                Lustrous_Heroic_King_SP:    "Lustrous Heroic King SP",
                Radiant_Maestro:            "Radiant Maestro (Parallel)",
                Radiant_Maestro_SP:         "Radiant Maestro (Parallel) SP",
                Absolute_Power:             "Absolute Power",
                Absolute_Power_SP:          "Absolute Power SP",
                Pale_Mist:                  "88th Rite - Pale Mist Refined",
                Pale_Mist_SP:               "88th Rite - Pale Mist Refined SP",
                Voltaic_Chains:             "Voltaic Chains",
                Voltaic_Chains_SP:          "Voltaic Chains SP",
                Bruteforce_Girl:            "15 (Bruteforce Girl)",
                Bruteforce_Girl_SP:         "30 (Bruteforce Girl SP)",
                Great_White_Shark_Soulbeast:"28 (Great White Shark Soulbeast)",
                }
            },
    
    options:{
            jp: {
                cardtype_select:            "--- カードタイプ・プリセット ---",
                cardtype_totallyNormal:     "通常",
                cardtype_normal:            "ダメージ増加の効果が2倍",
                cardtype_setup:             "セットアップ",
                cardtype_debug:             "デバッグ",
                cardtype_XY:                "Xの数だけ、ダメージ+Y",
                cardtype_LustrousHeroicKing:"光の英雄王",
                cardtype_RadiantMaestro:    "陽光の老騎士 アナザー",
                cardtype_AbsolutePower:     "絶対的なチカラ"
                },
            en: {
                cardtype_select:            "--- Choose card type & presets ---",
                cardtype_totallyNormal:     "Normal",
                cardtype_normal:            "Double all damage boost effects",
                cardtype_setup:             "Setup",
                cardtype_debug:             "Debug",
                cardtype_XY:                "For each X, damage +Y",
                cardtype_LustrousHeroicKing:"Lustrous Heroic King",
                cardtype_RadiantMaestro:    "Radiant Maestro (Parallel)",
                cardtype_AbsolutePower:     "Absolute Power"
                }
    
            }
        };

function createLocalizationObject(localization, prefix = "") {
    const result = {};
    for (const key in localization) {
        result[`${prefix}${key}`] = localization[key];
    }
    return result;
}

const buttons = {
    jp: {
        ...createLocalizationObject(localizations.buttons.jp),
        ...createLocalizationObject(localizations.buttons.jp, "targetdamage_"),
        language_jp:                   "日本語",
        language_en:                   "English",
        targetdamage_swap:             '<img src="boost.png" style="width: 16px; height:16px;">ブーストと<img src="damage+.png" style="width: 16px; height:16px;">ダメージ+を入替'
    },
    en: {
        ...createLocalizationObject(localizations.buttons.en),
        ...createLocalizationObject(localizations.buttons.en, "targetdamage_"),
        language_jp:                   "日本語",
        language_en:                   "English",
        targetdamage_swap:             'Switch <img src="boost.png" style="width: 16px; height:16px;"> boost and <img src="damage+.png" style="width: 16px; height:16px;"> damage+'
    }
};

const options = {
    jp: {
        ...createLocalizationObject(localizations.options.jp),
        ...createLocalizationObject(localizations.options.jp, "targetdamage_")
    },
    en: {
        ...createLocalizationObject(localizations.options.en),
        ...createLocalizationObject(localizations.options.en, "targetdamage_")
    }
};


const messages = {
    
    jp:{
                title:          "カルアンダメージ計算機",
                mode_calculate:  "<img src='buffs.png' >計算機",
                mode_target:  "<img src='attack.png' >目標ダメージ",
        
                basedamage:     "元のダメージ:",
                boost:          "ブースト:",
                damageplus:     "ダメージ+:",
                ratio:          "ダメージ増加の効果:",
                setup:          "セットアップ:",
                debug:          "デバッグ:",
                additionaldamage:          "追加ダメージ:",
                single:         "1倍",
                double:         "2倍",
                quadruple:      "4倍",
                custom:         "カスタム:",
                cardtext_totaldamage:        "合計{0}ダメージ。",
                cardtext_damage:        "{0}ダメージ。",
                cardtext_damageratio:   "ダメージ増加の効果が{0}倍。",
                cardtext_damageratio_2:   "ダメージ増加の効果が{0}倍。",
                cardtext_setup:         '<font color="yellow">セットアップ</font>{1}：ダメージ+{0}。',
                cardtext_debug:         '<font color="yellow">デバッグ</font>{1}：ダメージ+{0}。',
                cardtext_addtotal:      '<br>(+{0}ダメージ)',
        
                cardtext_eachXplusY:    "Xの数だけ、ダメージ+{0}。（+{1}ダメージ）",
                cardtext_each5cardsplusY:    '<span><font color="yellow">セットアップ</font>{3}：</span><span>このターン、</span><span>手札が5枚のときに</span><span>使用したカードの数だけ、</span><span>ダメージ+{0}。</span><br>（+{1}ダメージ）',
                cardtext_eachDamagePlusplusY:    '<font color="yellow">セットアップ</font>{3}：<img src="damage+.png" style="width: 16px; height:16px;">の数だけ、ダメージ+{0}。<br>（+{1}ダメージ）',
                cardtext_eachBoostplusY:'<img src="boost.png" style="width: 16px; height:16px;">をすべて失い、{0}ダメージ。<br>失った数だけ、ダメージ+{1}。<br>（+{2}ダメージ）',
                cardtext_2x:    "2",
                cardtext_4x:    "4",
                catchphrase:     "ぶっ壊れ爽快<br>&nbsp;カードバトルRPG",
                formula:        "計算式:",
        
                targetdamage_basedamage:     "元のダメージ:",
                targetdamage_setup:                          "セットアップ:",
                targetdamage_debug:                          "デバッグ:",
                targetdamage_additionaldamage:               "追加ダメージ:",
                
        
                targetdamage_targetdamage:     "目標ダメージ:",
                targetdamage_ratio:          "ダメージ増加の効果:",
                targetdamage_single:         "1倍",
                targetdamage_double:         "2倍",
                targetdamage_quadruple:      "4倍",
                targetdamage_custom:         "カスタム:",
                targetdamage_breakdown:         "ブレイクダウン",
                targetdamage_table_boost:   "ブースト",
                targetdamage_table_damageplus:    "ダメージ+",
                targetdamage_table_damage:    "ダメージ",
        
                targetdamage_cardtext_eachXplusY:    "Xの数だけ、ダメージ+{0}。",
                targetdamage_cardtext_eachDamagePlusplusY:    '<font color="yellow">セットアップ</font>{3}：<img src="damage+.png" style="width: 16px; height:16px;">の数だけ、ダメージ+{0}。',
                targetdamage_cardtext_eachBoostplusY:'<img src="boost.png" style="width: 16px; height:16px;">をすべて失い、{0}ダメージ。<br>失った数だけ、ダメージ+{1}。'
        
            },
    en: {
                title:          "Card-en-Ciel calculator",
                mode_calculate:  "<img src='buffs.png' >Calculator",
                mode_target:  "<img src='attack.png' >Target Damage",
        
                basedamage:     "Base damage:",
                boost:          "Boost:",
                damageplus:     "Damage+:",
                ratio:          "Damage boost effects:",
                setup:          "Setup:",
                debug:          "Debug:",
                additionaldamage:          "Bonus damage:",
                single:         "1x",
                double:         "2x",
                quadruple:      "4x",
                custom:         "Custom:",
                cardtext_totaldamage:        "Total {0} damage.",
                cardtext_damage:        "{0} damage.",
                cardtext_damageratio:   "{0}x all damage boost effects.",
                cardtext_damageratio_2:   "{0} all damage boost effects.",
                cardtext_setup:         '<font color="yellow">Setup</font>{1}: +{0} damage.',
                cardtext_debug:         '<font color="yellow">Debug</font>{1}: +{0} damage.',
                cardtext_addtotal:      '<br>(+{0} damage)',
                cardtext_eachXplusY:    "+{0} damage for each X.(+{1} damage)",
                cardtext_each5cardsplusY:    '<font color="yellow">Setup</font>{3}: +{0} damage for each per card that was used while at 5 cards in hand this turn.<br>(+{1} damage)',
                cardtext_eachDamagePlusplusY:    '<font color="yellow">Setup</font>{3}: +{0} damage for each <img src="damage+.png" style="width: 16px; height:16px;">.<br>(+{1} damage)',
                cardtext_eachBoostplusY:'Lose all <img src="boost.png" style="width: 16px; height:16px;"> and deal {0} damage.<br>+{1} damage per <img src="boost.png" style="width: 16px; height:16px;"> lost.<br>(+{2} damage)',
        
                cardtext_2x:   "Double",
                cardtext_4x:   "Quadruple",
                catchphrase:    "<i>\"Glitch\"<br>&nbsp; &nbsp;your way to victory!</i>",
                formula:        "Calculation formula:",
            
                targetdamage_basedamage:    "Base damage:",
                targetdamage_setup:                      "Setup:",
                targetdamage_debug:                      "Debug:",
                targetdamage_additionaldamage:           "Bonus damage:",
                targetdamage_targetdamage:     "Target damage:",
                targetdamage_ratio:          "Damage boost effects:",
                targetdamage_single:         "1x",
                targetdamage_double:         "2x",
                targetdamage_quadruple:      "4x",
                targetdamage_custom:         "Custom:",
                targetdamage_breakdown:      "Breakdown",
        
                targetdamage_table_boost:   "Boost",
                targetdamage_table_damageplus:    "Damage+",
                targetdamage_table_damage:    "Damage",
        
                targetdamage_cardtext_eachXplusY:    "+{0} damage for each X.",
                targetdamage_cardtext_eachDamagePlusplusY:    '<font color="yellow">Setup</font>{3}: +{0} damage for each <img src="damage+.png" style="width: 16px; height:16px;">.',
                targetdamage_cardtext_eachBoostplusY:'Lose all <img src="boost.png" style="width: 16px; height:16px;"> and deal {0} damage.<br>+{1} damage per <img src="boost.png" style="width: 16px; height:16px;"> lost.'
            }
};



        const images = {
            jp: {
                damagetable:    "damagetable.png"
                },
            en: {
                damagetable:    "damagetable_en.png"
                }
        };
