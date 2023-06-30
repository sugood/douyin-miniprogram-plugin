
package com.sugood.ijplugin.tt_miniprogram.lang.ttml;

import com.intellij.lang.xml.XMLLanguage;

public class TTMLLanguage extends XMLLanguage {

    public static String[] EVENT_ATTRIBUTE_PREFIX_ARRAY = new String[]{"bind", "catch", "bind:", "catch:", "mut-bind", "mut-bind:"};

    public static TTMLLanguage INSTANCE = new TTMLLanguage();

    private TTMLLanguage() {
        super(XMLLanguage.INSTANCE, "TTML");
    }

}
